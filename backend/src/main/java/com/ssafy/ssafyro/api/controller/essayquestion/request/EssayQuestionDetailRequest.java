package com.ssafy.ssafyro.api.controller.essayquestion.request;

import com.ssafy.ssafyro.api.service.essayquestion.request.EssayQuestionDetailServiceRequest;
import com.ssafy.ssafyro.domain.MajorType;
import jakarta.validation.constraints.NotNull;

public record EssayQuestionDetailRequest(@NotNull MajorType type, @NotNull Integer generation) {

    public EssayQuestionDetailServiceRequest toServiceRequest() {
        return new EssayQuestionDetailServiceRequest(type, generation);
    }
}
