package com.ssafy.ssafyro.api.controller.interview;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.controller.interview.dto.ArticleResponse;
import com.ssafy.ssafyro.api.controller.interview.dto.QuestionResultRequest;
import com.ssafy.ssafyro.api.controller.interview.dto.ScoreRequest;
import com.ssafy.ssafyro.api.controller.interview.dto.StartRequest;
import com.ssafy.ssafyro.api.controller.interview.dto.StartResponse;
import com.ssafy.ssafyro.api.service.interview.InterviewService;
import lombok.RequiredArgsConstructor;
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
                new StartResponse(interviewService.startInterview(startRequest))
        );
    }

    @GetMapping("/api/v1/interview/pt/{roomId}")
    public ApiResult<ArticleResponse> showArticle(@PathVariable String roomId) {
        return success(
                interviewService.showArticle(roomId)
        );
    }

    @PostMapping("/api/v1/interview/question-result")
    public ApiResult<Void> saveQuestionResult(
            @RequestBody QuestionResultRequest questionAnswerRequest) {
        return success(null);
    }

    @PostMapping("/api/v1/interview/score")
    public ApiResult<Void> saveScore(@RequestBody ScoreRequest scoreRequest) {
        return success(null);
    }
}
