package com.ssafy.ssafyro.api.controller.interviewresult;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.service.interviewresult.InterviewResultService;
import com.ssafy.ssafyro.api.service.interviewresult.response.InterviewResultsResponse;
import com.ssafy.ssafyro.security.JwtAuthentication;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class InterviewResultController {

    private final InterviewResultService interviewResultService;

    @GetMapping("/api/v1/interview-result/best")
    public ApiResult<InterviewResultsResponse> getBestInterviewResult(
            @AuthenticationPrincipal JwtAuthentication userInfo) {
        return success(
                interviewResultService.getRecommendInterviewResultsFor(userInfo.id())
        );
    }
}
