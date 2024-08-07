package com.ssafy.ssafyro.api.controller.interview.request;

import com.ssafy.ssafyro.api.service.interview.request.InterviewStageServiceRequest;
import com.ssafy.ssafyro.domain.room.Stage;
import jakarta.validation.constraints.NotNull;

public record InterviewStageRequest(@NotNull Stage nowStage) {

    public InterviewStageServiceRequest toServiceRequest() {
        return new InterviewStageServiceRequest(nowStage);
    }
}
