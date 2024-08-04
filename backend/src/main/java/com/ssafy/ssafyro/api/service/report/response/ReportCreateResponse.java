package com.ssafy.ssafyro.api.service.report.response;

import com.ssafy.ssafyro.domain.report.Report;

public record ReportCreateResponse(Long userId, Long reportId) {

    public static ReportCreateResponse of(Report report) {
        return new ReportCreateResponse(report.getUserId(), report.getId());
    }
}
