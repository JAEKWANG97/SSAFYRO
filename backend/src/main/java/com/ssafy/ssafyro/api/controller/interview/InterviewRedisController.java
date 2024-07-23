package com.ssafy.ssafyro.api.controller.interview;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.controller.interview.dto.QuestionResultRequest;
import com.ssafy.ssafyro.api.service.interview.InterviewRedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class InterviewRedisController {

    private final InterviewRedisService interviewRedisService;

    @PostMapping("/api/v1/interview/question-result")
    public ApiResult<Void> saveQuestionResult(
            @RequestBody QuestionResultRequest questionAnswerRequest) {
        return success(null);
    }
}
