package com.ssafy.ssafyro.domain.essay;

import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.domain.MajorType;
import com.ssafy.ssafyro.domain.essayquestion.EssayQuestion;
import com.ssafy.ssafyro.domain.essayquestion.EssayQuestionRepository;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.domain.user.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class EssayRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EssayRepository essayRepository;

    @Autowired
    private EssayQuestionRepository essayQuestionRepository;

    @AfterEach
    void tearDown() {
        essayRepository.deleteAllInBatch();
        userRepository.deleteAllInBatch();
        essayQuestionRepository.deleteAllInBatch();
    }

    @DisplayName("유저 id를 바탕으로 에세이를 상세 조회한다.")
    @Test
    void findByUserTest() {
        //given
        User user = createUser();
        userRepository.save(user);

        EssayQuestion essayQuestion = createEssayQuestion();
        essayQuestionRepository.save(essayQuestion);

        Essay essay = createEssay(user, essayQuestion);
        essayRepository.save(essay);

        //when
        Essay findEssay = essayRepository.findByUser(user).get();

        //then
        assertThat(findEssay).extracting("id", "content")
                .containsExactly(essay.getId(), essay.getContent());
    }

    private User createUser() {
        return User.builder()
                .username("enduf768640@gmail.com")
                .nickname("김두열")
                .providerId("providerId")
                .profileImageUrl("https://profileImageUrl.example")
                .majorType(MajorType.MAJOR)
                .build();
    }

    private EssayQuestion createEssayQuestion() {
        return EssayQuestion.builder()
                .generation(1)
                .majorType(MajorType.MAJOR)
                .content("에세이 질문")
                .characterLimit(600)
                .build();
    }

    private Essay createEssay(User user, EssayQuestion question) {
        return Essay.builder()
                .user(user)
                .question(question)
                .content("에세이")
                .build();
    }
}