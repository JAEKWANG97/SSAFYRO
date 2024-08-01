package com.ssafy.ssafyro.api.service.itKnowledge.response;

import com.ssafy.ssafyro.domain.itknowledge.ItKnowledge;
import lombok.Builder;

@Builder
public record ItKnowledgeDetailResponse(Long id,
                                        String title,
                                        String thumbnailImageUrl,
                                        String articleUrl) {

    public static ItKnowledgeDetailResponse of(ItKnowledge itKnowledge) {

        return new ItKnowledgeDetailResponse(itKnowledge.getId(),
                itKnowledge.getTitle(),
                itKnowledge.getThumbnailImageUrl(),
                itKnowledge.getArticleUrl());
    }
}
