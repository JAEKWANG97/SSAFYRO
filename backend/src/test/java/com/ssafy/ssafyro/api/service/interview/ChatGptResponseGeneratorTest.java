package com.ssafy.ssafyro.api.service.interview;

import com.ssafy.ssafyro.IntegrationTestSupport;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class ChatGptResponseGeneratorTest extends IntegrationTestSupport {

    @Autowired
    private ChatGptResponseGenerator chatGptResponseGenerator;

    //API 키 필요
    @DisplayName("ChatGPT API를 활용해 질문에 대한 답변이 적절한지 피드백을 얻는다.")
    @Test
    void generateFeedbackTest() {
//        //given
//        String question = "";
//        String answer = "";
//
//        //when
//        String feedback = chatGptResponseGenerator.generateFeedbackBy(question, answer);
//
//        //then
//        System.out.println(feedback);
    }

}