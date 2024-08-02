package com.ssafy.ssafyro.api.controller.itKnowledge.dto;

import com.ssafy.ssafyro.api.service.itKnowledge.request.ItKnowledgeListServiceRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

public record ItKnowledgeListRequest(@PageableDefault(page = 0, size = 10) Pageable pageable) {

    public ItKnowledgeListServiceRequest toServiceRequest() {
        return new ItKnowledgeListServiceRequest(pageable());
    }
}
