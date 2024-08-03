package com.ssafy.ssafyro.api.service.report.request;

import java.util.Map;

public record ReportCreateServiceRequest(String roomId, Map<Long, Integer> totalScores) {
}
