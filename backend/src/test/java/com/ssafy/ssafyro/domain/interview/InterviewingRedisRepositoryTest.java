package com.ssafy.ssafyro.domain.interview;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.tuple;

import com.ssafy.ssafyro.IntegrationTestSupport;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class InterviewingRedisRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private InterviewRedisRepository interviewRedisRepository;

    @AfterEach
    void tearDown() {
        interviewRedisRepository.deleteAll();
    }

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
                .extracting("userId", "question", "answer",
                        "pronunciationScore", "happy", "disgust", "sad",
                        "surprise", "fear", "angry", "neutral")
                .contains(userId, "question" + personOrderNumber,
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

    @DisplayName("key 값인 userId 로 저장된 redis 의 정보를 가져온다.")
    @Test
    void findByUserId() {
        //given
        String id = "userId";
        InterviewRedis interview = createInterview(1.0, id);
        InterviewRedis saved = interviewRedisRepository.save(interview);

        //when
        List<InterviewRedis> interviewRedis = interviewRedisRepository.findByUserId(id).orElse(new ArrayList<>());

        //then
        assertThat(interviewRedis).hasSize(1)
                .extracting("userId", "question", "answer", "happy")
                .containsExactlyInAnyOrder(
                        tuple(id, "question1.0", "answer1.0", 1.0)
                );
    }

    @DisplayName("하나의 key 에 List 전체를 저장합니다.")
    @Test
    void saveAllTest() {
        //given
        double personOrderNumber = 1.0;
        String userId = "user7605";
        InterviewRedis interviewing1 = createInterview(personOrderNumber, userId);
        InterviewRedis interviewing2 = createInterview(++personOrderNumber, userId);
        InterviewRedis interviewing3 = createInterview(++personOrderNumber, userId);
        interviewRedisRepository.saveAll(userId, List.of(interviewing1, interviewing2, interviewing3));

        //when
        List<InterviewRedis> interviewRedis = interviewRedisRepository.findByUserId(userId).orElse(new ArrayList<>());

        //then
        assertThat(interviewRedis).hasSize(3)
                .extracting("userId", "question", "answer", "happy")
                .containsExactlyInAnyOrder(
                        tuple(userId, "question1.0", "answer1.0", 1.0),
                        tuple(userId, "question2.0", "answer2.0", 2.0),
                        tuple(userId, "question3.0", "answer3.0", 3.0)
                );
    }

    private InterviewRedis createInterview(double personOrderNumber, String userId) {
        return InterviewRedis.builder()
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