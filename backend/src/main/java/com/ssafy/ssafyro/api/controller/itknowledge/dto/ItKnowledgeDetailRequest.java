package com.ssafy.ssafyro.api.controller.itknowledge.dto;

import com.ssafy.ssafyro.api.service.itknowledge.request.ItKnowledgeDetailServiceRequest;
import jakarta.validation.constraints.NotNull;

public record ItKnowledgeDetailRequest(@NotNull Long id) {

    public ItKnowledgeDetailServiceRequest toServiceRequest() {
        return new ItKnowledgeDetailServiceRequest(id());
    }
}
