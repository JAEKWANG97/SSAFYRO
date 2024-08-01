package com.ssafy.ssafyro.api.controller.codingtestproblem;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.service.codingtestproblem.response.CodingTestProblemDetailResponse;
import com.ssafy.ssafyro.api.service.codingtestproblem.response.CodingTestProblemListResponse;
import com.ssafy.ssafyro.domain.codingtestproblem.Difficulty;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CodingTestProblemController {

    @GetMapping("/api/v1/coding-test-problems")
    public ApiResult<CodingTestProblemListResponse> findAll(@PageableDefault Pageable pageable) {
        return success(new CodingTestProblemListResponse(
                List.of(
                ))
        );
    }

    @GetMapping("/api/v1/coding-test-problems/{id}")
    public ApiResult<CodingTestProblemDetailResponse> findById(@PathVariable Long id) {
        return success(new CodingTestProblemDetailResponse(
                1L,
                "홀수만 더하기",
                Difficulty.D1,
                100,
                0,
                "https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV5QSEhaA5sDFAUq"
        ));
    }
}
