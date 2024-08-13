package com.ssafy.ssafyro.domain.codingtestproblem;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.groups.Tuple.tuple;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.domain.MajorType;
import com.ssafy.ssafyro.domain.problemscrap.ProblemScrap;
import com.ssafy.ssafyro.domain.problemscrap.ProblemScrapRepository;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.domain.user.UserRepository;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

class CodingTestProblemRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProblemScrapRepository problemScrapRepository;

    @Autowired
    private CodingTestProblemRepository codingTestProblemRepository;

    @AfterEach
    void tearDown() {
        problemScrapRepository.deleteAllInBatch();
        codingTestProblemRepository.deleteAllInBatch();
        userRepository.deleteAllInBatch();
    }

    @Transactional
    @DisplayName("유저 별 스크랩한 코딩 테스트 문제 목록을 조회한다.")
    @Test
    void getScrapedCodingTestProblemsBy() {
        //given
        User user1 = createUser();
        userRepository.save(user1);

        User user2 = createUser();
        userRepository.save(user2);

        CodingTestProblem problem1 = createProblem("문제1");
        CodingTestProblem problem2 = createProblem("문제2");
        CodingTestProblem problem3 = createProblem("문제3");
        CodingTestProblem problem4 = createProblem("문제4");
        codingTestProblemRepository.saveAll(List.of(problem1, problem2, problem3, problem4));

        ProblemScrap problemScrap1 = createProblemScrap(user1, problem1);
        ProblemScrap problemScrap2 = createProblemScrap(user1, problem2);
        ProblemScrap problemScrap3 = createProblemScrap(user2, problem3);
        ProblemScrap problemScrap4 = createProblemScrap(user2, problem4);
        problemScrapRepository.saveAll(List.of(problemScrap1, problemScrap2, problemScrap3, problemScrap4));

        //when
        List<CodingTestProblem> problems = codingTestProblemRepository.getScrapedCodingTestProblemsBy(
                user1.getId(), Pageable.ofSize(5)
        );

        //then
        assertThat(problems).hasSize(2)
                .extracting("id", "title")
                .containsExactlyInAnyOrder(
                        tuple(problem1.getId(), "문제1"),
                        tuple(problem2.getId(), "문제2")
                );
    }

    private User createUser() {
        return User.builder()
                .username("ssafyro@gmail.com")
                .nickname("ssafyRo")
                .providerId("providerId")
                .profileImageUrl("www.image.url")
                .majorType(MajorType.MAJOR)
                .build();
    }

    private CodingTestProblem createProblem(String title) {
        return CodingTestProblem.builder()
                .title(title)
                .difficulty(Difficulty.D1)
                .correctRate(100.0)
                .recommendationCount(0)
                .problemUrl("https://example.com")
                .build();
    }

    private ProblemScrap createProblemScrap(User user, CodingTestProblem problem) {
        return ProblemScrap.builder()
                .user(user)
                .codingTestProblem(problem)
                .build();
    }
}