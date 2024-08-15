package com.ssafy.ssafyro.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LlamaController {

    private final ChatClient chatClient;

    @GetMapping("/llamachat")
    public String joke() {
        return chatClient.prompt()
                .system("안낭하세요 저는 에세이 첨삭가 AI 입니다. 한글로만 답변을 드리겠습니다. 무엇을 도와드릴까요?")
                .user("너의 역할은? 나마에와 ")
                .call()
                .content();
    }
}
