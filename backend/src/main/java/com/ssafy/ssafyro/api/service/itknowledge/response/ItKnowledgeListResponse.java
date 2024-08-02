package com.ssafy.ssafyro.api.service.itknowledge.response;

import com.ssafy.ssafyro.domain.itknowledge.ItKnowledge;
import java.util.List;
import lombok.Builder;
import org.springframework.data.domain.Page;

@Builder
public record ItKnowledgeListResponse(List<ItKnowledgeInfo> itKnowledgeList) {

    public static ItKnowledgeListResponse of(Page<ItKnowledge> itKnowledge) {

        return new ItKnowledgeListResponse(
                itKnowledge.stream()
                        .map(ItKnowledgeInfo::new)
                        .toList()
        );
    }

    private record ItKnowledgeInfo(Long id,
                                      String title,
                                      String thumbnailImageUrl,
                                      String articleUrl) {

          public ItKnowledgeInfo(ItKnowledge itKnowledge) {
                this(
                      itKnowledge.getId(),
                      itKnowledge.getTitle(),
                      itKnowledge.getThumbnailImageUrl(),
                      itKnowledge.getArticleUrl()
                );
          }
     }
}
