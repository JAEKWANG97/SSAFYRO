package com.ssafy.ssafyro.api.controller.chat;

import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.ssafyro.api.controller.chat.dto.MessageRequest;
import com.ssafy.ssafyro.api.controller.chat.dto.MessageResponse;
import com.ssafy.ssafyro.api.controller.chat.dto.NotificationResponse;
import java.lang.reflect.Type;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class ChatControllerTest {

    @LocalServerPort
    private int port;

    @DisplayName("채팅 서버에 메시지를 보내면 구독자들에게 메시지를 전달한다.")
    @Test
    void chatTest() throws Exception {
        // given
        StompSession session = getStompSession();
        CompletableFuture<MessageResponse> subscribeFuture = new CompletableFuture<>();

        String roomId = generateRandomRoomId();
        session.subscribe("/topic/" + roomId, this.createMessageStompFrameHandler(subscribeFuture));

        // when
        session.send("/chat/" + roomId, new MessageRequest("김두열", "안녕"));

        // then
        MessageResponse response = subscribeFuture.get(5, TimeUnit.SECONDS);
        assertThat(response).extracting("name", "message")
                .containsExactly("김두열", "안녕");
    }

    @DisplayName("채팅 서버에 입장하면 구독자들에게 메시지를 전달한다.")
    @Test
    void enterRoomTest() throws Exception {
        // given
        StompSession session = getStompSession();
        CompletableFuture<NotificationResponse> subscribeFuture = new CompletableFuture<>();

        String roomId = generateRandomRoomId();
        session.subscribe("/topic/" + roomId, this.createNotificationStompFrameHandler(subscribeFuture));

        // when
        session.send("/chat/enter/" + roomId, new MessageRequest("김두열", "입장"));

        // then
        NotificationResponse response = subscribeFuture.get(5, TimeUnit.SECONDS);
        assertThat(response.content()).isEqualTo("김두열님이 입장하셨습니다.");
    }

    @DisplayName("채팅 서버에서 퇴장하면 구독자들에게 메시지를 전달한다.")
    @Test
    void leaveRoomTest() throws Exception {
        // given
        StompSession session = getStompSession();
        CompletableFuture<NotificationResponse> subscribeFuture = new CompletableFuture<>();

        String roomId = generateRandomRoomId();
        session.subscribe("/topic/" + roomId, this.createNotificationStompFrameHandler(subscribeFuture));

        // when
        session.send("/chat/leave/" + roomId, new MessageRequest("김두열", "퇴장"));

        // then
        NotificationResponse response = subscribeFuture.get(5, TimeUnit.SECONDS);
        assertThat(response.content()).isEqualTo("김두열님이 퇴장하셨습니다.");
    }

    @DisplayName("면접을 시작하면 구독자들에게 메시지를 전달한다.")
    @Test
    void startInterviewTest() throws Exception {
        // given
        StompSession session = getStompSession();
        CompletableFuture<NotificationResponse> subscribeFuture = new CompletableFuture<>();

        String roomId = generateRandomRoomId();
        session.subscribe("/topic/" + roomId, this.createNotificationStompFrameHandler(subscribeFuture));

        // when
        session.send("/chat/interview/start/" + roomId, new MessageRequest("김두열", "면접 시작"));

        // then
        NotificationResponse response = subscribeFuture.get(5, TimeUnit.SECONDS);
        assertThat(response.content()).isEqualTo("김두열님이 면접을 시작하셨습니다!");
    }

    @DisplayName("면접을 종료하면 구독자들에게 메시지를 전달한다.")
    @Test
    void finishInterviewTest() throws Exception {
        // given
        StompSession session = getStompSession();
        CompletableFuture<NotificationResponse> subscribeFuture = new CompletableFuture<>();

        String roomId = generateRandomRoomId();
        session.subscribe("/topic/" + roomId, this.createNotificationStompFrameHandler(subscribeFuture));

        // when
        session.send("/chat/interview/finish/" + roomId, new MessageRequest("김두열", "면접 종료"));

        // then
        NotificationResponse response = subscribeFuture.get(5, TimeUnit.SECONDS);
        assertThat(response.content()).isEqualTo("김두열님이 면접을 종료하셨습니다!");
    }

    private StompSession getStompSession() throws Exception {
        WebSocketStompClient webSocketStompClient = new WebSocketStompClient(new StandardWebSocketClient());
        webSocketStompClient.setMessageConverter(new MappingJackson2MessageConverter());

        return webSocketStompClient.connectAsync(
                        String.format("ws://localhost:%s/ssafyro-chat", port),
                        new StompSessionHandlerAdapter() {
                        })
                .get(5, TimeUnit.SECONDS);
    }

    private StompFrameHandler createMessageStompFrameHandler(CompletableFuture<MessageResponse> subscribeFuture) {
        return new StompFrameHandler() {

            @Override
            public Type getPayloadType(StompHeaders headers) {
                return MessageResponse.class;
            }

            @Override
            public void handleFrame(StompHeaders headers, Object payload) {
                subscribeFuture.complete((MessageResponse) payload);
            }
        };
    }

    private StompFrameHandler createNotificationStompFrameHandler(
            CompletableFuture<NotificationResponse> subscribeFuture) {
        return new StompFrameHandler() {

            @Override
            public Type getPayloadType(StompHeaders headers) {
                return NotificationResponse.class;
            }

            @Override
            public void handleFrame(StompHeaders headers, Object payload) {
                subscribeFuture.complete((NotificationResponse) payload);
            }
        };
    }

    private String generateRandomRoomId() {
        return UUID.randomUUID().toString();
    }
}