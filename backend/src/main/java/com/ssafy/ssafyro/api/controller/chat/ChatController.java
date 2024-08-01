package com.ssafy.ssafyro.api.controller.chat;

import com.ssafy.ssafyro.api.controller.chat.dto.Receive;
import com.ssafy.ssafyro.api.controller.chat.dto.Send;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    @MessageMapping("/enter/{roomId}")
    @SendTo("/topic/{roomId}")
    public Receive enterRoom(@DestinationVariable String roomId, Send send) {
        return new Receive(send.name() + "님이 입장하셨습니다.");
    }

    @MessageMapping("/leave/{roomId}")
    @SendTo("/topic/{roomId}")
    public Receive leaveRoom(@DestinationVariable String roomId, Send send) {
        return new Receive(send.name() + "님이 퇴장하셨습니다.");
    }

    @MessageMapping("/{roomId}")
    @SendTo("/topic/{roomId}")
    public Send chat(@DestinationVariable String roomId, Send send) {
        return send;
    }

    @MessageMapping("/interview/start/{roomId}")
    @SendTo("/topic/{roomId}")
    public Receive startInterview(@DestinationVariable String roomId, Send send) {
        return new Receive(send.name() + "님이 면접을 시작하셨습니다!");
    }

    @MessageMapping("/interview/finish/{roomId}")
    @SendTo("/topic/{roomId}")
    public Receive finishInterview(@DestinationVariable String roomId, Send send) {
        return new Receive(send.name() + "님이 면접을 종료하셨습니다!");
    }
}