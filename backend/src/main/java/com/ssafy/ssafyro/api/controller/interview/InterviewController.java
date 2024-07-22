package com.ssafy.ssafyro.api.controller.interview;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.controller.interview.dto.QuestionAnswerRequest;
import com.ssafy.ssafyro.api.controller.interview.dto.StartRequest;
import com.ssafy.ssafyro.api.controller.interview.dto.StartResponse;
import com.ssafy.ssafyro.api.service.interview.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    @PostMapping("/api/v1/interview/start")
    public ApiResult<StartResponse> startInterview(@RequestBody StartRequest startRequest) {
        return success(
                new StartResponse(interviewService.startInterview(startRequest))
        );
    }

    @PostMapping("/api/v1/interview/question-answer")
    public ApiResult<Void> saveQuestionAnswer(@RequestBody QuestionAnswerRequest questionAnswerRequest) {
        return success(null);
    }
}
