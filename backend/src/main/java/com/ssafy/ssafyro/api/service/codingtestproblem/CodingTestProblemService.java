package com.ssafy.ssafyro.api.service.codingtestproblem;

import com.ssafy.ssafyro.api.service.codingtestproblem.response.CodingTestProblemResponse;
import com.ssafy.ssafyro.api.service.codingtestproblem.response.CodingTestProblemsResponse;
import com.ssafy.ssafyro.domain.codingtestproblem.CodingTestProblem;
import com.ssafy.ssafyro.domain.codingtestproblem.CodingTestProblemRepository;
import com.ssafy.ssafyro.error.codingtestproblem.CodingTestProblemNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class CodingTestProblemService {

    private final CodingTestProblemRepository codingTestProblemRepository;

    public CodingTestProblemsResponse getProblems(Pageable pageable) {
        return new CodingTestProblemsResponse(
                codingTestProblemRepository.findAll(pageable).getContent()
        );
    }

    public CodingTestProblemsResponse getScrapedProblemsBy(Long userId, Pageable pageable) {
        return new CodingTestProblemsResponse(
                codingTestProblemRepository.getScrapedCodingTestProblemsBy(userId, pageable)
        );
    }

    public CodingTestProblemResponse getProblem(Long id) {
        CodingTestProblem problem = getCodingTestProblem(id);

        return new CodingTestProblemResponse(problem);
    }

    private CodingTestProblem getCodingTestProblem(Long id) {
        return codingTestProblemRepository.findById(id)
                .orElseThrow(() -> new CodingTestProblemNotFoundException("Problem not found"));
    }
}
