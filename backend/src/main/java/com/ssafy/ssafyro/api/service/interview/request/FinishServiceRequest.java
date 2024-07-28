package com.ssafy.ssafyro.api.service.interview.request;

import java.util.Map;

public record FinishServiceRequest(String roomId, Map<Long, Integer> totalScores) {
}
