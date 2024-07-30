package com.ssafy.ssafyro.api.controller.interview.request;

import com.ssafy.ssafyro.api.service.interview.request.FinishServiceRequest;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import java.util.stream.Collectors;

public record FinishRequest(@NotEmpty String roomId, List<TotalScore> totalScores) {

    public FinishServiceRequest toServiceRequest() {
        return new FinishServiceRequest(
                roomId,
                totalScores.stream().collect(Collectors.toMap(TotalScore::userId, TotalScore::totalScore)
                )
        );
    }

    public record TotalScore(Long userId, int totalScore) {
    }
}
