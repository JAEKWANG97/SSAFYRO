package com.ssafy.ssafyro.api.controller.report.dto;

import com.ssafy.ssafyro.api.service.report.request.ReportListServiceRequest;
import jakarta.validation.constraints.NotNull;

public record ReportListRequest(@NotNull Long userId) {

    public ReportListServiceRequest toServiceRequest(int page, int size) {
        return ReportListServiceRequest.builder()
                .userId(userId)
                .page(page)
                .size(size)
                .build();
    }
}
