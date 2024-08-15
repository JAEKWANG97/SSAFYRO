package com.ssafy.ssafyro.api.service.codingtestproblem.response;

import com.ssafy.ssafyro.domain.codingtestproblem.CodingTestProblem;
import com.ssafy.ssafyro.domain.codingtestproblem.Difficulty;

public record CodingTestProblemResponse(Long id,
                                        String title,
                                        Difficulty difficulty,
                                        double correctRate,
                                        int recommendationCount,
                                        String problemUrl) {

    public CodingTestProblemResponse(CodingTestProblem problem) {
        this(
                problem.getId(),
                problem.getTitle(),
                problem.getDifficulty(),
                problem.getCorrectRate(),
                problem.getRecommendationCount(),
                problem.getProblemUrl()
        );
    }
}
