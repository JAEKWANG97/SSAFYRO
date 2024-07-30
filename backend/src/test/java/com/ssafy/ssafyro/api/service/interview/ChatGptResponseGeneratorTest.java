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
    void generateFeedbackTest() throws InterruptedException {
        //given
        String question = "AI가 무엇인가요?";
        String answer = "AI는 인공지능을 의미합니다. 인공지능은 인간의 지능을 모방하여 만든 기술이며, 컴퓨터 프로그램이나 기계가 인간의 학습능력, 추론능력, 지각능력, 자연어 이해능력 등을 갖추도록 만든 기술입니다.";

        //when
        String feedback = chatGptResponseGenerator.generateFeedbackBy(question, answer);

        //then
        System.out.println(feedback);
    }


    @DisplayName("ChatGPT API를 활용해 IT 기사 제목, 내용, 질문을 생성한다.")
    @Test
    void createArticlePromptTest() {


        // when
        AiArticle aiArticle = chatGptResponseGenerator.generateArticle();
        // then
        System.out.println(aiArticle.title());
        System.out.println(aiArticle.content());
        System.out.println(aiArticle.question().get(0));
        System.out.println(aiArticle.question().get(1));
    }
}