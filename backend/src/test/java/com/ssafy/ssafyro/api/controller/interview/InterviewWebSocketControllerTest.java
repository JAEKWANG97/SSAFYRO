package com.ssafy.ssafyro.api.controller.interview;

import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.ssafyro.api.controller.ControllerTestSupport;
import com.ssafy.ssafyro.api.controller.interview.request.InterviewStageRequest;
import com.ssafy.ssafyro.api.service.interview.response.ExitResponse;
import com.ssafy.ssafyro.api.service.interview.response.InterviewStageResponse;
import com.ssafy.ssafyro.api.service.room.RoomService;
import com.ssafy.ssafyro.api.service.room.request.RoomCreateServiceRequest;
import com.ssafy.ssafyro.api.service.room.request.RoomEnterServiceRequest;
import com.ssafy.ssafyro.domain.MajorType;
import com.ssafy.ssafyro.domain.room.Stage;
import com.ssafy.ssafyro.domain.room.redis.RoomRedis;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.domain.user.UserRepository;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

class InterviewWebSocketControllerTest extends ControllerTestSupport {

    @LocalServerPort
    private int port;

    @Autowired
    private UserRepository userRepository;

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

        userRepository.deleteAllInBatch();
    }

    @DisplayName("첫 번째 스테이지의 면접자의 순서를 지정해준다.")
    @Test
    void changeTurnInterviewerTest() throws Exception {
        //given
        User user = createUser();
        userRepository.save(user);

        StompSession session = getStompSession();
        CompletableFuture<InterviewStageResponse> subscribeFuture = new CompletableFuture<>();

        String roomId = roomService.createRoom(new RoomCreateServiceRequest(
                "title",
                "description",
                "PERSONALITY",
                3
        )).roomId();
        roomService.enterRoom(user.getId(), new RoomEnterServiceRequest(roomId));

        session.subscribe("/topic/interview/" + roomId, this.createTurnResponseStompFrameHandler(subscribeFuture));

        //when
        session.send("/interview/turn/" + roomId, new InterviewStageRequest(Stage.FIRST));

        //then
        InterviewStageResponse response = subscribeFuture.get(5, TimeUnit.SECONDS);
        assertThat(response).isNotNull()
                .extracting("nowStage", "nowUserId")
                .containsExactlyInAnyOrder(
                        Stage.FIRST, user.getId()
                );
    }

    @DisplayName("두 번째 스테이지의 면접자의 순서를 지정해준다.")
    @Test
    void changeTurnInterviewerTest2() throws Exception {
        //given
        User user1 = createUser();
        User user2 = createUser();
        userRepository.saveAll(List.of(user1, user2));

        StompSession session = getStompSession();
        CompletableFuture<InterviewStageResponse> subscribeFuture = new CompletableFuture<>();

        String roomId = roomService.createRoom(new RoomCreateServiceRequest(
                "title",
                "description",
                "PERSONALITY",
                3
        )).roomId();
        roomService.enterRoom(user1.getId(), new RoomEnterServiceRequest(roomId));
        roomService.enterRoom(user2.getId(), new RoomEnterServiceRequest(roomId));

        session.subscribe("/topic/interview/" + roomId, this.createTurnResponseStompFrameHandler(subscribeFuture));

        //when
        session.send("/interview/turn/" + roomId, new InterviewStageRequest(Stage.SECOND));

        //then
        InterviewStageResponse response = subscribeFuture.get(5, TimeUnit.SECONDS);
        assertThat(response).isNotNull()
                .extracting("nowStage", "nowUserId")
                .containsExactlyInAnyOrder(
                        Stage.SECOND, user2.getId()
                );

    }

    @DisplayName("현재 스테이지의 면접자의 순서를 지정할 때, 마지막 순서 이후에는 호출할 수 없다. (현재 인원 2명)")
    @Test
    void changeTurnInterviewerTest3() throws Exception {
        //given
        User user1 = createUser();
        User user2 = createUser();
        userRepository.saveAll(List.of(user1, user2));

        StompSession session = getStompSession();
        CompletableFuture<InterviewStageResponse> subscribeFuture = new CompletableFuture<>();

        String roomId = roomService.createRoom(new RoomCreateServiceRequest(
                "title",
                "description",
                "PERSONALITY",
                3
        )).roomId();
        roomService.enterRoom(user1.getId(), new RoomEnterServiceRequest(roomId));
        roomService.enterRoom(user2.getId(), new RoomEnterServiceRequest(roomId));

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

    @DisplayName("면접 중 면접자가 나간다.")
    @Test
    void exitInterviewerTest() throws Exception {
        // given
        User user1 = createUser();
        User user2 = createUser();
        User user3 = createUser();
        userRepository.saveAll(List.of(user1, user2, user3));

        StompSession session = getStompSession();
        CompletableFuture<ExitResponse> subscribeFuture = new CompletableFuture<>();

        String roomId = roomService.createRoom(new RoomCreateServiceRequest(
                "title",
                "description",
                "PERSONALITY",
                3
        )).roomId();

        roomService.enterRoom(user1.getId(), new RoomEnterServiceRequest(roomId));
        roomService.enterRoom(user2.getId(), new RoomEnterServiceRequest(roomId));
        roomService.enterRoom(user3.getId(), new RoomEnterServiceRequest(roomId));

        session.subscribe("/topic/interview/" + roomId, createExitResponseStompFrameHandler(subscribeFuture));

        // when
        session.send("/interview/exit/" + roomId, user1.getId());

        // then
        ExitResponse response = subscribeFuture.get(5, TimeUnit.SECONDS);
        assertThat(response.userList()).doesNotContain(user1.getId());
        assertThat(response.userList()).hasSize(2);
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

    private StompFrameHandler createExitResponseStompFrameHandler(CompletableFuture<ExitResponse> subscribeFuture) {
        return new StompFrameHandler() {
            @Override
            public Type getPayloadType(StompHeaders headers) {
                return ExitResponse.class;
            }

            @Override
            public void handleFrame(StompHeaders headers, Object payload) {
                if (payload instanceof ExitResponse) {
                    subscribeFuture.complete((ExitResponse) payload);
                } else {
                    subscribeFuture.completeExceptionally(new RuntimeException("Invalid response type received"));
                }
            }
        };
    }

    private User createUser() {
        return User.builder()
                .username("ssafyro@gmail.com")
                .nickname("ssafyRo")
                .providerId("providerId")
                .profileImageUrl("www.image.url")
                .majorType(MajorType.MAJOR)
                .build();
    }
}