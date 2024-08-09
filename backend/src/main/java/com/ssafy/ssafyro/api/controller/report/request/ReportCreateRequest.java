package com.ssafy.ssafyro.api.controller.report.request;

import com.ssafy.ssafyro.api.service.report.request.ReportCreateServiceRequest;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record ReportCreateRequest(@NotEmpty String roomId,
                                  Long articleId,
                                  @NotNull Long userId,
                                  @NotNull Integer totalScore) {

    public ReportCreateServiceRequest toServiceRequest() {
        return new ReportCreateServiceRequest(roomId, articleId, userId, totalScore);
    }
}
