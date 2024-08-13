package com.ssafy.ssafyro.api.service.codingtestproblem.response;

public record CodingTestProblemScrapResponse(Long problemScrapId,
                                             Long userId) {

    public static CodingTestProblemScrapResponse of(Long problemScrapId, Long userId) {
        return new CodingTestProblemScrapResponse(problemScrapId, userId);
    }
}
