package com.ssafy.ssafyro.api.service.codingtestproblem;

import com.ssafy.ssafyro.api.service.codingtestproblem.response.CodingTestProblemDetailResponse;
import com.ssafy.ssafyro.api.service.codingtestproblem.response.CodingTestProblemListResponse;
import com.ssafy.ssafyro.domain.codingtestproblem.CodingTestProblem;
import com.ssafy.ssafyro.domain.codingtestproblem.CodingTestProblemRepository;
import com.ssafy.ssafyro.error.codingtestproblem.CodingTestProblemNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class CodingTestProblemService {

    private final CodingTestProblemRepository codingTestProblemRepository;

    public CodingTestProblemListResponse findAll(Pageable pageable) {
        List<CodingTestProblem> problems = codingTestProblemRepository.findAll(pageable)
                .getContent();

        return new CodingTestProblemListResponse(problems);
    }

    public CodingTestProblemDetailResponse findById(Long id) {
        CodingTestProblem problem = getCodingTestProblem(id);

        return new CodingTestProblemDetailResponse(problem);
    }

    private CodingTestProblem getCodingTestProblem(Long id) {
        return codingTestProblemRepository.findById(id)
                .orElseThrow(() -> new CodingTestProblemNotFoundException("Problem not found"));
    }
}
