package com.ssafy.ssafyro.api.controller.interviewresult;

import static com.ssafy.ssafyro.api.ApiUtils.success;
import static org.springframework.data.domain.Sort.Direction.DESC;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.controller.interviewresult.request.InterviewResultsRequest;
import com.ssafy.ssafyro.api.service.interviewresult.InterviewResultService;
import com.ssafy.ssafyro.api.service.interviewresult.response.InterviewResultsResponse;
import com.ssafy.ssafyro.security.JwtAuthentication;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class InterviewResultController {

    private final InterviewResultService interviewResultService;

    @GetMapping("/api/v1/interview-result/user/best")
    public ApiResult<InterviewResultsResponse> getBestInterviewResults(@AuthenticationPrincipal JwtAuthentication userInfo,
                                                                       @PageableDefault(sort = "evaluationScore", direction = DESC) Pageable pageable) {
        return success(
                interviewResultService.getRecommendInterviewResultsFor(userInfo.id(), pageable)
        );
    }

    @GetMapping("/api/v1/interview-result/user")
    public ApiResult<InterviewResultsResponse> getInterviewResultsByUserId(@AuthenticationPrincipal JwtAuthentication userInfo,
                                                                           @PageableDefault(sort = "evaluationScore") Pageable pageable) {
        return success(
                interviewResultService.getInterviewResultsBy(userInfo.id(), pageable)
        );
    }

    @GetMapping("/api/v1/interview-result/{id}/best")
    public ApiResult<InterviewResultsResponse> getBestInterviewResultsById(@PathVariable String id,
                                                                           @PageableDefault(sort = "evaluationScore") Pageable pageable) {
        return success(
                interviewResultService.getBestInterviewResultsFor(id, pageable)
        );
    }

    @GetMapping("/api/v1/interview-result")
    public ApiResult<InterviewResultsResponse> getInterviewResults(@ModelAttribute InterviewResultsRequest request,
                                                                   @PageableDefault(sort = "evaluationScore") Pageable pageable) {
        return success(
                interviewResultService.getInterviewResultsBy(request.query(), pageable)
        );
    }
}
