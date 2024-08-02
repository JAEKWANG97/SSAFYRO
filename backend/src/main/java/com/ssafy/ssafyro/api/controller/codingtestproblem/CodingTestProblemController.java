package com.ssafy.ssafyro.api.controller.codingtestproblem;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.service.codingtestproblem.CodingTestProblemService;
import com.ssafy.ssafyro.api.service.codingtestproblem.response.CodingTestProblemDetailResponse;
import com.ssafy.ssafyro.api.service.codingtestproblem.response.CodingTestProblemListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CodingTestProblemController {

    private final CodingTestProblemService codingTestProblemService;

    @GetMapping("/api/v1/coding-test-problems")
    public ApiResult<CodingTestProblemListResponse> findAll(@PageableDefault Pageable pageable) {
        return success(
                codingTestProblemService.findAll(pageable)
        );
    }

    @GetMapping("/api/v1/coding-test-problems/{id}")
    public ApiResult<CodingTestProblemDetailResponse> findById(@PathVariable Long id) {
        return success(
                codingTestProblemService.findById(id)
        );
    }
}
