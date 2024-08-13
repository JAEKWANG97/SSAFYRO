package com.ssafy.ssafyro.domain.codingtestproblem;

import java.util.List;
import org.springframework.data.domain.Pageable;

public interface CodingTestProblemQueryRepository {

    List<CodingTestProblem> getScrapedCodingTestProblemsBy(Long userId, Pageable pageable);
}
