package com.ssafy.ssafyro.api.service.interview.response;

public record SelectEvaluatorResponse(Long userId) {

    public static SelectEvaluatorResponse of(Long userId) {
        return new SelectEvaluatorResponse(userId);
    }
}
