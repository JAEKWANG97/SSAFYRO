package com.ssafy.ssafyro.domain.codingtestproblem;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CodingTestProblemRepository extends JpaRepository<CodingTestProblem, Long>,
        CodingTestProblemQueryRepository {
}
