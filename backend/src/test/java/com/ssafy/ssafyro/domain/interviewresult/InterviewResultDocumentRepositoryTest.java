package com.ssafy.ssafyro.domain.interviewresult;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.tuple;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.api.service.report.KoMorAnGenerator;
import com.ssafy.ssafyro.domain.interview.InterviewRedis;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;

class InterviewResultDocumentRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private InterviewResultDocumentRepository interviewResultDocumentRepository;

    @Autowired
    private KoMorAnGenerator koMorAnGenerator;

    @AfterEach
    void tearDown() {
        interviewResultDocumentRepository.deleteAll();
    }

    @DisplayName("점수가 가장 낮은 5개의 질문, 답변을 가져 온다.")
    @Test
    void findByUserId() {
        //given
        InterviewResultDocument interviewResultDocument1 = createInterviewResultDocument(1L, "질문1", "답변1", 100);
        InterviewResultDocument interviewResultDocument2 = createInterviewResultDocument(1L, "질문2", "답변2", 10);
        InterviewResultDocument interviewResultDocument3 = createInterviewResultDocument(1L, "질문3", "답변3", 30);
        InterviewResultDocument interviewResultDocument4 = createInterviewResultDocument(1L, "질문4", "답변4", 80);
        InterviewResultDocument interviewResultDocument5 = createInterviewResultDocument(1L, "질문5", "답변5", 20);
        InterviewResultDocument interviewResultDocument6 = createInterviewResultDocument(1L, "질문6", "답변6", 50);
        InterviewResultDocument interviewResultDocument7 = createInterviewResultDocument(1L, "질문7", "답변7", 60);
        InterviewResultDocument interviewResultDocument8 = createInterviewResultDocument(1L, "질문8", "답변8", 70);
        InterviewResultDocument interviewResultDocument9 = createInterviewResultDocument(1L, "질문9", "답변9", 90);
        InterviewResultDocument interviewResultDocument10 = createInterviewResultDocument(1L, "질문10", "답변10", 40);

        interviewResultDocumentRepository.saveAll(
                List.of(interviewResultDocument1, interviewResultDocument2,
                        interviewResultDocument3, interviewResultDocument4,
                        interviewResultDocument5, interviewResultDocument6,
                        interviewResultDocument7, interviewResultDocument8,
                        interviewResultDocument9, interviewResultDocument10)
        );

        //when
        List<InterviewResultDocument> interviewResultDocuments = interviewResultDocumentRepository.findTop5ByUserIdOrderByEvaluationScore(
                1L);

        //then
        assertThat(interviewResultDocuments)
                .hasSize(5)
                .extracting("question", "answer", "evaluationScore")
                .containsExactlyInAnyOrder(
                        tuple("질문2", "답변2", 10),
                        tuple("질문5", "답변5", 20),
                        tuple("질문3", "답변3", 30),
                        tuple("질문10", "답변10", 40),
                        tuple("질문6", "답변6", 50)
                );
    }

    @DisplayName("태그 기반으로 가장 점수가 높은 인터뷰 결과를 찾는다.")
    @Test
    void findBestInterviewResultByTags() {
        //given
        String question1 = "디자이너로서 앞으로의 목표에 관해서 설명해 주세요";
        String answer1 = "저는 디자이너로서 많은 경험들을 쌓아서 그것들을 토대로 제 개인 브랜드를 런칭하는 게 목표입니다.";

        String question2 = "지원자님께서는 이전 직장에서 퇴사한 후 퇴사한 것을 후회하신 적이 있나요? 있으시면 왜인지도 함께 말씀 부탁드립니다.";
        String answer2 = "정말 그런 시기가 왔을 때 제가 이 일에 정말 관심이 생겼고 제가 꿈꿨던 그런 순간이 왔다고 생각했을 때 뒤도 돌아보지 않고 그만뒀기 때문에 전혀 후회하지 않습니다.";

        String question3 = "지금까지 인생을 살면서 지원자님은 가장 후회되는 일이 있다면 어떤 일이 있었나요? 한 가지만 말씀해 주세요.";
        String answer3 = "저는 이상하게 어릴 때부터 그렇게 후회하면서 살지 않았기 때문에 딱히 후회하는 일이 없습니다.";

        String question4 = "디자인을 할 때 가장 중요하게 생각하는 점이 무엇인가요?";
        String answer4 = "저는 현실성이라고 생각합니다. 현실적으로 이 디자인이 제품으로 나올 때까지 어 너무 오래 걸리지 않고 무리하지 않는 선에서 나올 수 있는 지를 중요하게 생각합니다.";

        String question5 = "지원자님이 태어나서 지금까지 한 일들 가운데 가장 후회했던 일이 무엇인가요? 한 가지만 골라 말씀해 주세요.";
        String answer5 = "어렸을 때 굉장히 친하게 지낸 친구가 있습니다. 어 제일 친하다고 생각했었고 모든 이야기를 공유하는 사이였습니다. 지금까지 연락이 되지 않고 있는데 그때 어떤 사연이었는지 묻지 못했던 것을 후회하고 있습니다.";

        InterviewResultDocument interviewResultDocument1 = createInterviewResultDocument(1L, question1, answer1, 80);
        InterviewResultDocument interviewResultDocument2 = createInterviewResultDocument(1L, question2, answer2, 95);
        InterviewResultDocument interviewResultDocument3 = createInterviewResultDocument(1L, question3, answer3, 90);
        InterviewResultDocument interviewResultDocument4 = createInterviewResultDocument(1L, question4, answer4, 85);
        InterviewResultDocument interviewResultDocument5 = createInterviewResultDocument(1L, question5, answer5, 100);

        interviewResultDocumentRepository.saveAll(
                List.of(
                        interviewResultDocument1,
                        interviewResultDocument2,
                        interviewResultDocument3,
                        interviewResultDocument4,
                        interviewResultDocument5
                )
        );

        //when
        List<InterviewResultDocument> interviewResult = interviewResultDocumentRepository.findBestInterviewResultsBy(
                List.of("후회", "인생", "왜"), 100L, Pageable.ofSize(5)
        );

        //then
        assertThat(interviewResult).hasSize(3)
                .extracting("question", "answer", "evaluationScore")
                .containsExactly(
                        tuple(question3, answer3, 90),
                        tuple(question5, answer5, 100),
                        tuple(question2, answer2, 95)
                );
    }

    private InterviewResultDocument createInterviewResultDocument(Long userId,
                                                                  String question,
                                                                  String answer,
                                                                  int score) {
        return InterviewResultDocument.create(
                createInterview(userId, question, answer, score), koMorAnGenerator
        );
    }

    private InterviewRedis createInterview(Long userId, String question, String answer, int score) {
        return InterviewRedis.builder()
                .userId(userId)
                .question(question)
                .answer(answer)
                .pronunciationScore(100)
                .evaluationScore(score)
                .happy(100)
                .disgust(0)
                .sad(0)
                .surprise(0)
                .fear(0)
                .angry(0)
                .neutral(0)
                .build();
    }
}