package com.ssafy.ssafyro.api.service.essay;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.api.service.essay.request.EssayReviewServiceRequest;
import com.ssafy.ssafyro.api.service.essay.request.EssaySaveServiceRequest;
import com.ssafy.ssafyro.api.service.essay.response.EssayReviewResponse;
import com.ssafy.ssafyro.api.service.essay.response.EssaySaveResponse;
import com.ssafy.ssafyro.api.service.interview.ChatGptResponseGenerator;
import com.ssafy.ssafyro.domain.MajorType;
import com.ssafy.ssafyro.domain.essayquestion.EssayQuestion;
import com.ssafy.ssafyro.domain.essayquestion.EssayQuestionRepository;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.domain.user.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class EssayServiceTest extends IntegrationTestSupport {

    @Autowired
    private EssayService essayService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EssayQuestionRepository essayQuestionRepository;

    @MockBean
    private ChatGptResponseGenerator chatGptResponseGenerator;

    @DisplayName("ChatGPT API를 활용하여 에세이를 첨삭받는다.")
    @Test
    void reviewEssayTest() {
        //given
        given(chatGptResponseGenerator.generateNewEssay(any(String.class), any(String.class)))
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
    void saveTest() {
        //given
        User user = userRepository.save(createUser());

        EssayQuestion essayQuestion = essayQuestionRepository.save(createEssayQuestion());

        EssaySaveServiceRequest essaySaveServiceRequest = new EssaySaveServiceRequest(
                1L,
                1L,
                "에세이"
        );

        //when
        EssaySaveResponse response = essayService.save(essaySaveServiceRequest);

        //then
        assertThat(response.essayId()).isEqualTo(1L);
    }

    private EssayQuestion createEssayQuestion() {
        return EssayQuestion.builder()
                .generation(11)
                .majorType(MajorType.MAJOR)
                .content("에세이 질문")
                .characterLimit(600)
                .build();
    }

    private User createUser() {
        return User.builder()
                .providerId("providerId")
                .providerName("providerName")
                .nickname("김두열")
                .profileImageUrl("profileImageUrl")
                .majorType(MajorType.MAJOR)
                .build();
    }
}