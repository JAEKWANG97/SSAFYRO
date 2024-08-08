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
        InterviewResultDocument interviewResultDocument1 = createInterviewResultDocument(1L, 1, 100);
        InterviewResultDocument interviewResultDocument2 = createInterviewResultDocument(1L, 2, 10);
        InterviewResultDocument interviewResultDocument3 = createInterviewResultDocument(1L, 3, 30);
        InterviewResultDocument interviewResultDocument4 = createInterviewResultDocument(1L, 4, 80);
        InterviewResultDocument interviewResultDocument5 = createInterviewResultDocument(1L, 5, 20);
        InterviewResultDocument interviewResultDocument6 = createInterviewResultDocument(1L, 6, 50);
        InterviewResultDocument interviewResultDocument7 = createInterviewResultDocument(1L, 7, 60);
        InterviewResultDocument interviewResultDocument8 = createInterviewResultDocument(1L, 8, 70);
        InterviewResultDocument interviewResultDocument9 = createInterviewResultDocument(1L, 9, 90);
        InterviewResultDocument interviewResultDocument10 = createInterviewResultDocument(1L, 10, 40);

        interviewResultDocumentRepository.saveAll(
                List.of(interviewResultDocument1, interviewResultDocument2,
                        interviewResultDocument3, interviewResultDocument4,
                        interviewResultDocument5, interviewResultDocument6,
                        interviewResultDocument7, interviewResultDocument8,
                        interviewResultDocument9, interviewResultDocument10)
        );

        //when
        List<InterviewResultDocument> interviewResultDocuments = interviewResultDocumentRepository.findBy(1L);

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

    private InterviewResultDocument createInterviewResultDocument(Long userId, int number, int score) {
        return InterviewResultDocument.create(
                createInterview(userId, number, score), koMorAnGenerator
        );
    }

    private InterviewRedis createInterview(Long userId, int number, int score) {
        return InterviewRedis.builder()
                .userId(userId)
                .question("질문" + number)
                .answer("답변" + number)
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