package com.ssafy.ssafyro.api.service.itKnowledge.response;

import com.ssafy.ssafyro.domain.itknowledge.ItKnowledge;
import java.util.List;
import lombok.Builder;
import org.springframework.data.domain.Page;

@Builder
public record ItKnowledgeListResponse(List<ItKnowledge> itKnowledgeList) {

    public static ItKnowledgeListResponse of(Page<ItKnowledge> itKnowledge) {

        return new ItKnowledgeListResponse(itKnowledge.getContent());
    }
}
