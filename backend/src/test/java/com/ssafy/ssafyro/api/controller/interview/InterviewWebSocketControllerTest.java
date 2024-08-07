package com.ssafy.ssafyro.api.controller.interview;

import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.ssafyro.api.controller.interview.request.InterviewStageRequest;
import com.ssafy.ssafyro.api.service.interview.response.InterviewStageResponse;
import com.ssafy.ssafyro.api.service.room.RoomService;
import com.ssafy.ssafyro.api.service.room.request.RoomCreateServiceRequest;
import com.ssafy.ssafyro.api.service.room.request.RoomEnterServiceRequest;
import com.ssafy.ssafyro.domain.room.Stage;
import com.ssafy.ssafyro.domain.room.redis.RoomRedis;
import java.lang.reflect.Type;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class InterviewWebSocketControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private RedisTemplate<String, RoomRedis> redisTemplate;

    @Autowired
    private RoomService roomService;

    @AfterEach
    void tearDown() {
        Set<String> keys = redisTemplate.keys("room:*");
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }

    @DisplayName("첫 번째 스테이지의 면접자의 순서를 지정해준다.")
    @Test
    void changeTurnInterviewerTest() throws Exception {
        //given
        StompSession session = getStompSession();
        CompletableFuture<InterviewStageResponse> subscribeFuture = new CompletableFuture<>();

        String roomId = roomService.createRoom(new RoomCreateServiceRequest(
                1L,
                "title",
                "description",
                "PERSONALITY",
                3
        )).roomId();

        session.subscribe("/topic/interview/" + roomId, this.createTurnResponseStompFrameHandler(subscribeFuture));

        //when
        session.send("/interview/turn/" + roomId, new InterviewStageRequest(Stage.FIRST));

        //then
        InterviewStageResponse response = subscribeFuture.get(5, TimeUnit.SECONDS);
        assertThat(response).isNotNull()
                .extracting("nowStage", "nowUserId")
                .containsExactlyInAnyOrder(
                        Stage.FIRST, 1L
                );
    }

    @DisplayName("두 번째 스테이지의 면접자의 순서를 지정해준다.")
    @Test
    void changeTurnInterviewerTest2() throws Exception {
        //given
        StompSession session = getStompSession();
        CompletableFuture<InterviewStageResponse> subscribeFuture = new CompletableFuture<>();

        String roomId = roomService.createRoom(new RoomCreateServiceRequest(
                1L,
                "title",
                "description",
                "PERSONALITY",
                3
        )).roomId();
        roomService.enterRoom(new RoomEnterServiceRequest(2L, roomId));

        session.subscribe("/topic/interview/" + roomId, this.createTurnResponseStompFrameHandler(subscribeFuture));

        //when
        session.send("/interview/turn/" + roomId, new InterviewStageRequest(Stage.SECOND));

        //then
        InterviewStageResponse response = subscribeFuture.get(5, TimeUnit.SECONDS);
        assertThat(response).isNotNull()
                .extracting("nowStage", "nowUserId")
                .containsExactlyInAnyOrder(
                        Stage.SECOND, 2L
                );

    }

    @DisplayName("현재 스테이지의 면접자의 순서를 지정할 때, 마지막 순서 이후에는 호출할 수 없다. (현재 인원 2명)")
    @Test
    void changeTurnInterviewerTest3() throws Exception {
        //given
        StompSession session = getStompSession();
        CompletableFuture<InterviewStageResponse> subscribeFuture = new CompletableFuture<>();

        String roomId = roomService.createRoom(new RoomCreateServiceRequest(
                1L,
                "title",
                "description",
                "PERSONALITY",
                3
        )).roomId();
        roomService.enterRoom(new RoomEnterServiceRequest(2L, roomId));

        session.subscribe("/topic/interview/" + roomId, this.createTurnResponseStompFrameHandler(subscribeFuture));

        //when
        session.send("/interview/turn/" + roomId, new InterviewStageRequest(Stage.THIRD));

        //then
        subscribeFuture.exceptionally(ex -> {
            assertThat(ex).isNotNull();
            assertThat(ex.getMessage()).contains("모든 순서가 끝났습니다.");
            return null;
        }).get(5, TimeUnit.SECONDS);
    }

    private StompSession getStompSession() throws Exception {
        WebSocketStompClient webSocketStompClient = new WebSocketStompClient(new StandardWebSocketClient());
        webSocketStompClient.setMessageConverter(new MappingJackson2MessageConverter());

        return webSocketStompClient.connectAsync(
                        String.format("ws://localhost:%s/ssafyro-chat", port),
                        new StompSessionHandlerAdapter() {
                        }
                )
                .get(5, TimeUnit.SECONDS);
    }

    private StompFrameHandler createTurnResponseStompFrameHandler(
            CompletableFuture<InterviewStageResponse> subscribeFuture) {
        return new StompFrameHandler() {

            @Override
            public Type getPayloadType(StompHeaders headers) {
                return InterviewStageResponse.class;
            }

            @Override
            public void handleFrame(StompHeaders headers, Object payload) {
                subscribeFuture.complete((InterviewStageResponse) payload);
            }
        };
    }

}