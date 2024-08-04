package com.ssafy.ssafyro.api.controller.report.request;

import com.ssafy.ssafyro.api.service.report.request.ReportCreateServiceRequest;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record ReportCreateRequest(@NotEmpty String roomId,
                                  @NotNull Long userId,
                                  @NotNull Integer totalScore) {

    public ReportCreateServiceRequest toServiceRequest() {
        return new ReportCreateServiceRequest(roomId, userId, totalScore);
    }

    public record TotalScore(Long userId, Integer score) {
    }
}
