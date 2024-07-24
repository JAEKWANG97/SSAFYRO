package com.ssafy.ssafyro.domain.Interview;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.tuple;

import com.ssafy.ssafyro.IntegrationTestSupport;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class InterviewingRedisRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private InterviewRedisRepository interviewRedisRepository;

    @DisplayName("면접 질문 답변 후 표정, 억양, 질문, 답변에 대한 내용을 Redis 에 저장한다.")
    @Test
    void saveQnAResult() {
        //given
        double personOrderNumber = 1.0;
        String userId = "user";
        InterviewRedis interview = createInterview(personOrderNumber, userId);

        //when
        InterviewRedis saved = interviewRedisRepository.save(interview);

        //then
        assertThat(saved)
                .extracting("roomId", "userId", "question", "answer",
                        "pronunciationScore", "happy", "disgust", "sad",
                        "surprise", "fear", "angry", "neutral")
                .contains("room", userId, "question" + personOrderNumber,
                        "answer" + personOrderNumber,
                        (int) personOrderNumber, personOrderNumber, personOrderNumber, personOrderNumber,
                        personOrderNumber, personOrderNumber, personOrderNumber, personOrderNumber);
    }

    @DisplayName("면접 질문 답변 저장 시, 한 사람에게 여러 질문이 저장될 수 있다.")
    @Test
    void saveQnA2() {
        //given
        double personOrderNumber = 1.0;
        String userId = "user";
        InterviewRedis interviewing1 = createInterview(personOrderNumber, userId);
        InterviewRedis interviewing2 = createInterview(++personOrderNumber, userId);
        InterviewRedis interviewing3 = createInterview(++personOrderNumber, userId);

        //when
        Iterable<InterviewRedis> result = interviewRedisRepository.saveAll(
                List.of(interviewing1, interviewing2, interviewing3));

        //then
        assertThat(result).hasSize(3)
                .extracting("question", "answer", "happy")
                .containsExactlyInAnyOrder(
                        tuple("question1.0", "answer1.0", 1.0),
                        tuple("question2.0", "answer2.0", 2.0),
                        tuple("question3.0", "answer3.0", 3.0)
                );
    }

    @DisplayName("면접 질문 답변 저장 시, 여러 사람에게 여러 질문이 저장될 수 있다.")
    @Test
    void saveQnA3() {
        //given
        double personOrderNumber = 1.0;
        InterviewRedis interviewing1 = createInterview(personOrderNumber, "user1");
        InterviewRedis interviewing2 = createInterview(++personOrderNumber, "user1");
        InterviewRedis interviewing3 = createInterview(++personOrderNumber, "user2");

        //when
        Iterable<InterviewRedis> result = interviewRedisRepository.saveAll(
                List.of(interviewing1, interviewing2, interviewing3));

        //then
        assertThat(result).hasSize(3)
                .extracting("userId", "question", "answer", "happy")
                .containsExactlyInAnyOrder(
                        tuple("user1", "question1.0", "answer1.0", 1.0),
                        tuple("user1", "question2.0", "answer2.0", 2.0),
                        tuple("user2", "question3.0", "answer3.0", 3.0)
                );
    }

    private InterviewRedis createInterview(double personOrderNumber, String userId) {
        return InterviewRedis.builder()
                .roomId("room")
                .userId(userId)
                .question("question" + personOrderNumber)
                .answer("answer" + personOrderNumber)
                .pronunciationScore((int) personOrderNumber)
                .happy(personOrderNumber)
                .disgust(personOrderNumber)
                .sad(personOrderNumber)
                .surprise(personOrderNumber)
                .fear(personOrderNumber)
                .angry(personOrderNumber)
                .neutral(personOrderNumber)
                .build();
    }
}