package com.ssafy.ssafyro.api.service.report.request;

public record ReportCreateServiceRequest(String roomId,
                                         Long articleId,
                                         Long userId,
                                         Integer totalScore) {
}
