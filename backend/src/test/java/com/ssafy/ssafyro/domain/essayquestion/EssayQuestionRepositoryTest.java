package com.ssafy.ssafyro.domain.essayquestion;

import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.domain.MajorType;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class EssayQuestionRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private EssayQuestionRepository essayQuestionRepository;

    @AfterEach
    void tearDown() {
        essayQuestionRepository.deleteAllInBatch();
    }

    @DisplayName("전공 여부와 기수를 바탕으로 에세이 질문을 조회한다.")
    @Test
    void findByMajorTypeAndGenerationTest() {
        //given
        EssayQuestion essayQuestion1 = createEssayQuestion(11, MajorType.MAJOR);
        essayQuestionRepository.save(essayQuestion1);

        EssayQuestion essayQuestion2 = createEssayQuestion(10, MajorType.NON_MAJOR);
        essayQuestionRepository.save(essayQuestion2);

        //when
        EssayQuestion essayQuestion = essayQuestionRepository.findByMajorTypeAndGeneration(MajorType.MAJOR, 11).get();

        //then
        assertThat(essayQuestion).extracting("id", "generation", "majorType")
                .containsExactly(essayQuestion1.getId(), 11, MajorType.MAJOR);
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