package com.ssafy.ssafyro.api.service.ai;

import com.ssafy.ssafyro.IntegrationTestSupport;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

//@Disabled
class AIResponseGeneratorTest extends IntegrationTestSupport {

    @DisplayName("생성형 LLM을 활용해 질문에 대한 답변이 적절한지 피드백을 얻는다.")
    @Test
    void generateFeedbackTest() {
        //given
        String question = "AI가 무엇인가요?";
        String answer = "AI는 인공지능을 의미합니다. 인공지능은 인간의 지능을 모방하여 만든 기술이며, 컴퓨터 프로그램이나 기계가 인간의 학습능력, 추론능력, 지각능력, 자연어 이해능력 등을 갖추도록 만든 기술입니다.";

        //when
        String feedback = aiResponseGenerator.generateFeedbackBy(question, answer);

        //then
        System.out.println(feedback);
    }


    @DisplayName("생성형 LLM을 활용해 IT 기사 제목, 내용, 질문을 생성한다.")
    @Test
    void createArticlePromptTest() {
        // when
        AiArticle aiArticle = aiResponseGenerator.generateArticle();

        // then
        System.out.println(aiArticle.title());
        System.out.println(aiArticle.content());
        System.out.println(aiArticle.questions().get(0));
        System.out.println(aiArticle.questions().get(1));
    }

    @DisplayName("생성형 LLM을 활용해 에세이를 첨삭 받는다.")
    @Test
    void generateNewEssayTest() {
        // given
        String question = " 향후 어떤 SW 개발자로 성장하고 싶은지 SW 관련 경험을 토대로 기술하고, SSAFY에 지원하신 동기에 대해서도 작성 바랍니다.";
        String answer = "저는 단순한 불편함을 넘어서 근본적인 문제를 발견하고 해결하는 개발자로 성장하고자 합니다. 대학교 빅데이터 분석 수업에서의 도전, 송파구 대피소 최적화 프로젝트는 이러한 철학을 실천하는데 중요한 경험이였습니다. 5명 중 4명이 미참여한 이 프로젝트에서, 저는 데이터 분석을 통해 대피소 할당 문제의 본질을 파악하고 k-means 알고리즘을 변형 후 적용하여 실질적인 해결책을 찾았습니다. 이 과정에서 저는 복잡한 문제를 깊이 분석하고, 창의적으로 해결하는 능력을 키웠습니다.";

        // when
        String newEssay = aiResponseGenerator.generateNewEssay(question, answer);

        // then
        System.out.println(newEssay);
    }

}