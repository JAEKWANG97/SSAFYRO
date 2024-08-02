package com.ssafy.ssafyro.api.controller.chat;

import com.ssafy.ssafyro.api.controller.chat.dto.MessageRequest;
import com.ssafy.ssafyro.api.controller.chat.dto.MessageResponse;
import com.ssafy.ssafyro.api.controller.chat.dto.NotificationResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    @MessageMapping("/{roomId}")
    @SendTo("/topic/{roomId}")
    public MessageResponse chat(@DestinationVariable String roomId, @Valid MessageRequest request) {
        return MessageResponse.of(request.name(), request.message());
    }

    @MessageMapping("/enter/{roomId}")
    @SendTo("/topic/{roomId}")
    public NotificationResponse enterRoom(@DestinationVariable String roomId, MessageRequest request) {
        return NotificationResponse.of(request.name() + "님이 입장하셨습니다.");
    }

    @MessageMapping("/leave/{roomId}")
    @SendTo("/topic/{roomId}")
    public NotificationResponse leaveRoom(@DestinationVariable String roomId, MessageRequest request) {
        return NotificationResponse.of(request.name() + "님이 퇴장하셨습니다.");
    }

    @MessageMapping("/interview/start/{roomId}")
    @SendTo("/topic/{roomId}")
    public NotificationResponse startInterview(@DestinationVariable String roomId, MessageRequest request) {
        return NotificationResponse.of(request.name() + "님이 면접을 시작하셨습니다!");
    }

    @MessageMapping("/interview/finish/{roomId}")
    @SendTo("/topic/{roomId}")
    public NotificationResponse finishInterview(@DestinationVariable String roomId, MessageRequest request) {
        return NotificationResponse.of(request.name() + "님이 면접을 종료하셨습니다!");
    }
}