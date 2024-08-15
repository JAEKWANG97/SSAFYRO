package com.ssafy.ssafyro.api.controller.interview.request;

import com.ssafy.ssafyro.api.service.interview.request.ScoreServiceRequest;
import jakarta.validation.constraints.NotNull;

public record ScoreRequest(@NotNull Long userId,
                           @NotNull Integer evaluationScore) {

    public ScoreServiceRequest toServiceRequest() {
        return new ScoreServiceRequest(userId, evaluationScore);
    }
}
