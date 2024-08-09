package com.ssafy.ssafyro.api.service.report;

import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.ssafyro.IntegrationTestSupport;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class KoMorAnGeneratorTest extends IntegrationTestSupport {

    @Autowired
    private KoMorAnGenerator koMorAnGenerator;

    @DisplayName("문장을 입력하면 키워드를 추출한다.")
    @Test
    void createTags() {
        //given
        String sentence = "문장은 생각이나 감정을 말로 표현할 때 완결된 내용을 나타내는 최소의 단위이다";

        //when
        List<String> tags = koMorAnGenerator.createTags(sentence);

        //then
        assertThat(tags).hasSize(10)
                .contains("문장", "생각", "감정", "말", "표현", "때", "완결", "내용", "최소", "단위");
    }

}