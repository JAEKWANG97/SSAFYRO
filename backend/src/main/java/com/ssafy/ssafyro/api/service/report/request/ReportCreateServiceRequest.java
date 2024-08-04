package com.ssafy.ssafyro.api.service.report.request;

public record ReportCreateServiceRequest(String roomId, Long userId, Integer totalScore) {
}
