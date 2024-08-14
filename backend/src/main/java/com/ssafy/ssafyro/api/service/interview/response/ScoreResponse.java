package com.ssafy.ssafyro.api.service.interview.response;

public record ScoreResponse(Long userId) {

    public static ScoreResponse of(Long userId) {
        return new ScoreResponse(userId);
    }
}
