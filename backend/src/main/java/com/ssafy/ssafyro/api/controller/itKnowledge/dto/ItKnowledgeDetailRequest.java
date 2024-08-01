package com.ssafy.ssafyro.api.controller.itKnowledge.dto;

import com.ssafy.ssafyro.api.service.itKnowledge.request.ItKnowledgeDetailServiceRequest;
import jakarta.validation.constraints.NotNull;

public record ItKnowledgeDetailRequest(@NotNull Long id) {

    public static ItKnowledgeDetailServiceRequest toServiceRequest(ItKnowledgeDetailRequest request) {
        return new ItKnowledgeDetailServiceRequest(request.id());
    }
}
