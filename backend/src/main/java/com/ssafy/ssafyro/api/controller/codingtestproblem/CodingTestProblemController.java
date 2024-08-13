package com.ssafy.ssafyro.api.controller.codingtestproblem;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.service.codingtestproblem.CodingTestProblemService;
import com.ssafy.ssafyro.api.service.codingtestproblem.response.CodingTestProblemResponse;
import com.ssafy.ssafyro.api.service.codingtestproblem.response.CodingTestProblemsResponse;
import com.ssafy.ssafyro.security.JwtAuthentication;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CodingTestProblemController {

    private final CodingTestProblemService codingTestProblemService;

    @GetMapping("/api/v1/coding-test-problems")
    public ApiResult<CodingTestProblemsResponse> getProblems(@PageableDefault Pageable pageable) {
        return success(
                codingTestProblemService.getProblems(pageable)
        );
    }

    @GetMapping("/api/v1/coding-test-problems/scrap")
    public ApiResult<CodingTestProblemsResponse> getScrapedProblemsBy(@AuthenticationPrincipal JwtAuthentication userInfo,
                                                                      @PageableDefault Pageable pageable) {
        return success(
                codingTestProblemService.getScrapedProblemsBy(userInfo.id(), pageable)
        );
    }

    @GetMapping("/api/v1/coding-test-problems/{id}")
    public ApiResult<CodingTestProblemResponse> getProblemById(@PathVariable Long id) {
        return success(
                codingTestProblemService.getProblem(id)
        );
    }
}
