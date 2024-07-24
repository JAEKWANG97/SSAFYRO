package com.ssafy.ssafyro.api.controller.chat;

import com.ssafy.ssafyro.api.controller.chat.dto.Receive;
import com.ssafy.ssafyro.api.controller.chat.dto.Send;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
public class ChatController {

    @MessageMapping("/{roomId}")
    @SendTo("/topic/{roomId}")
    public Receive chat(@DestinationVariable String roomId, Send send) {
        return new Receive(send.name() + ": " + send.message());
    }
}