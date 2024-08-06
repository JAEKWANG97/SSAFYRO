package com.ssafy.ssafyro.api.controller.interview.request;

import com.ssafy.ssafyro.api.service.interview.request.InterviewTurnServiceRequest;
import com.ssafy.ssafyro.domain.interview.Stage;
import jakarta.validation.constraints.NotNull;

public record InterviewStageRequest(@NotNull Stage nowStage) {

    public InterviewTurnServiceRequest toServiceRequest() {
        return new InterviewTurnServiceRequest(nowStage);
    }
}
