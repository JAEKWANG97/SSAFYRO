package com.ssafy.ssafyro.api.service.itKnowledge;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.api.service.itKnowledge.request.ItKnowledgeDetailServiceRequest;
import com.ssafy.ssafyro.api.service.itKnowledge.response.ItKnowledgeDetailResponse;
import com.ssafy.ssafyro.domain.itknowledge.ItKnowledge;
import com.ssafy.ssafyro.domain.itknowledge.ItKnowledgeRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class ItKnowledgeServiceTest extends IntegrationTestSupport {

    @Autowired
    private ItKnowledgeService itKnowledgeService;

    @Autowired
    private ItKnowledgeRepository itKnowledgeRepository;

    @DisplayName("특정 id로 IT 지식 상세 조회를 합니다.")
    @Test
    void getItKnowledgeById() {
        //given
        ItKnowledge itKnowledge = ItKnowledge.builder()
                .title("title")
                .thumbnailImageUrl("https://www.thumbnailImageUrl.com")
                .articleUrl("https://www.articleUrl.com")
                .build();

        itKnowledgeRepository.save(itKnowledge);

        Long id = itKnowledge.getId();

        ItKnowledgeDetailServiceRequest request = new ItKnowledgeDetailServiceRequest(id);

        //when
        ItKnowledgeDetailResponse response = itKnowledgeService.getItKnowledgeDetail(request);

        //then
        assertThat(response).isNotNull();
        assertThat(response.id()).isEqualTo(id);
        assertThat(response.title()).isEqualTo(itKnowledge.getTitle());
        assertThat(response.thumbnailImageUrl()).isEqualTo(itKnowledge.getThumbnailImageUrl());
        assertThat(response.articleUrl()).isEqualTo(itKnowledge.getArticleUrl());

    }

    @DisplayName("저장되지 않은 ID로 IT 지식 상세 조회를 시도하면 IllegalArgumentException을 던진다.")
    @Test
    void getItKnowledgeByExceptedId() {
        //given
        Long EXPECTED_ID = 1L;
        ItKnowledgeDetailServiceRequest request = new ItKnowledgeDetailServiceRequest(EXPECTED_ID);

        //when & then
        assertThatThrownBy(() -> itKnowledgeService.getItKnowledgeDetail(request))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("해당 아이디의 IT 지식이 존재하지 않습니다.");
    }
}