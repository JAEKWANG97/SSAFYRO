package com.ssafy.ssafyro.api.service.interview;

import com.ssafy.ssafyro.api.controller.interview.request.QuestionResultRequest;
import com.ssafy.ssafyro.api.controller.interview.request.StartRequest;
import com.ssafy.ssafyro.api.service.interview.response.ArticleResponse;
import com.ssafy.ssafyro.api.service.interview.response.StartResponse;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class InterviewService {

    public StartResponse startInterview(StartRequest startRequest) {
        return new StartResponse("모집완료");
    }

    public ArticleResponse showArticle(String roomId) {
        return new ArticleResponse("", List.of());
    }

    public void saveQuestionResult(QuestionResultRequest request) {
    }
}
