package com.ssafy.ssafyro.api.service.essay;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.api.service.essay.request.EssayReviewServiceRequest;
import com.ssafy.ssafyro.api.service.essay.request.EssaySaveServiceRequest;
import com.ssafy.ssafyro.api.service.essay.response.EssayDetailResponse;
import com.ssafy.ssafyro.api.service.essay.response.EssayReviewResponse;
import com.ssafy.ssafyro.api.service.essay.response.EssaySaveResponse;
import com.ssafy.ssafyro.api.service.essay.response.EssayUpdateResponse;
import com.ssafy.ssafyro.domain.MajorType;
import com.ssafy.ssafyro.domain.essay.Essay;
import com.ssafy.ssafyro.domain.essay.EssayRepository;
import com.ssafy.ssafyro.domain.essayquestion.EssayQuestion;
import com.ssafy.ssafyro.domain.essayquestion.EssayQuestionRepository;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.domain.user.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class EssayServiceTest extends IntegrationTestSupport {

    @Autowired
    private EssayService essayService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EssayRepository essayRepository;

    @Autowired
    private EssayQuestionRepository essayQuestionRepository;

    @DisplayName("ChatGPT API를 활용하여 에세이를 첨삭받는다.")
    @Test
    void reviewEssayTest() {
        //given
        given(aiResponseGenerator.generateNewEssay(any(String.class), any(String.class)))
                .willReturn("첨삭 후 에세이");

        EssayQuestion essayQuestion = essayQuestionRepository.save(createEssayQuestion());

        EssayReviewServiceRequest essayReviewServiceRequest = new EssayReviewServiceRequest(
                essayQuestion.getId(),
                "첨삭 전 에세이"
        );

        //when
        EssayReviewResponse response = essayService.reviewEssay(essayReviewServiceRequest);

        //then
        assertThat(response.content()).isEqualTo("첨삭 후 에세이");
    }

    @DisplayName("에세이를 저장한다.")
    @Test
    void createEssayTest() {
        //given
        User user = userRepository.save(createUser());

        EssayQuestion essayQuestion = essayQuestionRepository.save(createEssayQuestion());

        EssaySaveServiceRequest essaySaveServiceRequest = new EssaySaveServiceRequest(
                essayQuestion.getId(),
                "에세이"
        );

        //when
        EssaySaveResponse response = essayService.createEssayBy(user.getId(), essaySaveServiceRequest);

        //then
        assertThat(response.essayId()).isEqualTo(essayRepository.findByUser(user).get().getId());
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
        EssayDetailResponse response = essayService.findBy(user.getId());

        //then
        assertThat(response).extracting("userId", "content")
                .containsExactly(user.getId(), essay.getContent());
    }

    @DisplayName("에세이를 수정한다.")
    @Test
    void updateEssayTest() {
        //given
        User user = userRepository.save(createUser());

        EssayQuestion essayQuestion = essayQuestionRepository.save(createEssayQuestion());

        Essay essay = createEssay(user, essayQuestion);
        essayRepository.save(essay);

        EssaySaveServiceRequest essaySaveServiceRequest = new EssaySaveServiceRequest(
                essayQuestion.getId(),
                "수정된 에세이"
        );

        //when
        EssayUpdateResponse response = essayService.updateEssayBy(user.getId(), essaySaveServiceRequest);

        //then
        assertThat(essayRepository.findByUser(user).get().getContent()).isEqualTo("수정된 에세이");
        assertThat(response.essayId()).isEqualTo(essay.getId());
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
                .generation(11)
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