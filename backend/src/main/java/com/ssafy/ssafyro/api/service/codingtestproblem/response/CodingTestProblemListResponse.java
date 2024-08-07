package com.ssafy.ssafyro.api.service.codingtestproblem.response;

import com.ssafy.ssafyro.domain.codingtestproblem.CodingTestProblem;
import com.ssafy.ssafyro.domain.codingtestproblem.Difficulty;
import java.util.List;
import lombok.Data;

@Data
public class CodingTestProblemListResponse {

    private final List<CodingTestProblemInfo> problemInfos;

    public CodingTestProblemListResponse(List<CodingTestProblem> problems) {
        this.problemInfos = problems.stream()
                .map(CodingTestProblemInfo::new)
                .toList();
    }

    private record CodingTestProblemInfo(Long id,
                                         String title,
                                         Difficulty difficulty,
                                         double correctRate,
                                         int recommendationCount,
                                         String problemUrl) {
        public CodingTestProblemInfo(CodingTestProblem problem) {
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
}
