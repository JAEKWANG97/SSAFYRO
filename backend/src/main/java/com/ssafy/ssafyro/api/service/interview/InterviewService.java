package com.ssafy.ssafyro.api.service.interview;

import com.ssafy.ssafyro.api.controller.interview.dto.ArticleResponse;
import com.ssafy.ssafyro.api.controller.interview.dto.QuestionResultRequest;
import com.ssafy.ssafyro.api.controller.interview.dto.StartRequest;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class InterviewService {

    public String startInterview(StartRequest startRequest) {
        return "";
    }

    public ArticleResponse showArticle(String roomId) {
        return new ArticleResponse("", List.of());
    }
    
    public void saveQuestionResult(QuestionResultRequest request) {
    }
}
