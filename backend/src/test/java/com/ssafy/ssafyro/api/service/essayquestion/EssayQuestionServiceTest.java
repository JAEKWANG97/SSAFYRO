package com.ssafy.ssafyro.api.service.essayquestion;

import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.api.service.essayquestion.request.EssayQuestionDetailServiceRequest;
import com.ssafy.ssafyro.api.service.essayquestion.response.EssayQuestionDetailResponse;
import com.ssafy.ssafyro.domain.MajorType;
import com.ssafy.ssafyro.domain.essayquestion.EssayQuestion;
import com.ssafy.ssafyro.domain.essayquestion.EssayQuestionRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class EssayQuestionServiceTest extends IntegrationTestSupport {

    @Autowired
    private EssayQuestionRepository essayQuestionRepository;

    @Autowired
    private EssayQuestionService essayQuestionService;

    @DisplayName("전공 여부와 기수를 바탕으로 에세이 질문을 조회한다.")
    @Test
    void findByMajorTypeAndGenerationTest() {
        //given
        EssayQuestion essayQuestion = essayQuestionRepository.save(createEssayQuestion(11, MajorType.MAJOR));

        EssayQuestionDetailServiceRequest request = new EssayQuestionDetailServiceRequest(
                MajorType.MAJOR,
                11
        );

        //when
        EssayQuestionDetailResponse response = essayQuestionService.findByMajorTypeAndGeneration(request);

        //then
        assertThat(response).extracting("id", "content", "characterLimit")
                .containsExactly(essayQuestion.getId(), "에세이 질문", 600);
    }

    private EssayQuestion createEssayQuestion(int generation, MajorType type) {
        return EssayQuestion.builder()
                .generation(generation)
                .majorType(type)
                .content("에세이 질문")
                .characterLimit(600)
                .build();
    }
}