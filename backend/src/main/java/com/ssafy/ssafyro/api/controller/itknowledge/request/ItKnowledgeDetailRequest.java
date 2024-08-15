package com.ssafy.ssafyro.api.controller.itknowledge.request;

import com.ssafy.ssafyro.api.service.itknowledge.request.ItKnowledgeDetailServiceRequest;
import jakarta.validation.constraints.NotNull;

public record ItKnowledgeDetailRequest(@NotNull Long id) {

    public ItKnowledgeDetailServiceRequest toServiceRequest() {
        return new ItKnowledgeDetailServiceRequest(id());
    }
}
