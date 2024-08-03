package com.ssafy.ssafyro.api.controller.report.request;

import com.ssafy.ssafyro.api.service.report.request.ReportCreateServiceRequest;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public record ReportCreateRequest(String roomId, List<TotalScore> totalScores) {

    public ReportCreateServiceRequest toServiceRequest() {
        Map<Long, Integer> scores = totalScores.stream()
                .collect(Collectors.toMap(
                                TotalScore::userId,
                                TotalScore::score
                        )
                );

        return new ReportCreateServiceRequest(roomId, scores);
    }

    public record TotalScore(Long userId, Integer score) {
    }
}
