package com.ssafy.ssafyro.domain.interview;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.tuple;

import com.ssafy.ssafyro.IntegrationTestSupport;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@Disabled
class InterviewRedisRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private InterviewRedisRepository interviewRedisRepository;

    @AfterEach
    void tearDown() {
        interviewRedisRepository.deleteAll();
    }

    @DisplayName("면접 답변에 대한 질문, 답변, 표정, 발음에 대한 점수를 Json 으로 직렬화한 후 Redis에 List형식으로 저장한다.")
    @Test
    void saveTest() {
        //given
        InterviewRedis interview = createInterview(1L);

        //when
        interviewRedisRepository.save(interview);

        //then
        assertThat(interviewRedisRepository.findByUserId(1L))
                .extracting("userId", "question", "answer")
                .containsExactly(
                        tuple(1L, "질문1", "답변1")
                );
    }

    private InterviewRedis createInterview(Long userId) {
        return InterviewRedis.builder()
                .userId(userId)
                .question("질문" + userId)
                .answer("답변" + userId)
                .pronunciationScore(100)
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