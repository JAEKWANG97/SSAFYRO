package com.ssafy.ssafyro.api.controller.interview;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.controller.interview.request.FinishRequest;
import com.ssafy.ssafyro.api.controller.interview.request.QnAResultCreateRequest;
import com.ssafy.ssafyro.api.controller.interview.request.StartRequest;
import com.ssafy.ssafyro.api.service.interview.InterviewService;
import com.ssafy.ssafyro.api.service.interview.response.ArticleResponse;
import com.ssafy.ssafyro.api.service.interview.response.FinishResponse;
import com.ssafy.ssafyro.api.service.interview.response.QnAResultCreateResponse;
import com.ssafy.ssafyro.api.service.interview.response.StartResponse;
import com.ssafy.ssafyro.security.JwtAuthentication;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    @PatchMapping("/api/v1/interview/start")
    public ApiResult<StartResponse> startInterview(@RequestBody StartRequest startRequest) {
        return success(
                interviewService.startInterview(startRequest.roomId())
        );
    }

    @PatchMapping("/api/v1/interview/finish")
    public ApiResult<FinishResponse> finishInterview(@RequestBody FinishRequest finishRequest) {
        return success(
                interviewService.finishInterview(finishRequest.roomId())
        );
    }

    @GetMapping("/api/v1/interview/pt/{roomId}")
    public ApiResult<ArticleResponse> showArticle(@PathVariable String roomId) {
        return success(
                interviewService.getArticle(roomId)
        );
    }

    @PostMapping("/api/v1/interview/question-answer-result")
    public ApiResult<QnAResultCreateResponse> createQnAResult(@AuthenticationPrincipal JwtAuthentication userInfo,
                                                              @RequestBody QnAResultCreateRequest request) {
        return success(
                interviewService.createQnAResult(userInfo.id(), request.toServiceRequest())
        );
    }

}
