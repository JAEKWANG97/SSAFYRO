package com.ssafy.ssafyro.api.controller.essay.request;

import com.ssafy.ssafyro.api.service.essay.request.EssayReviewServiceRequest;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record EssayReviewRequest(@NotNull Long essayQuestionId,
                                 @NotEmpty String content) {

    public EssayReviewServiceRequest toServiceRequest() {
        return new EssayReviewServiceRequest(essayQuestionId, content);
    }
}
