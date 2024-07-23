package com.ssafy.ssafyro.api.service.interview;

import com.ssafy.ssafyro.api.controller.interview.request.StartRequest;
import com.ssafy.ssafyro.api.service.interview.request.QuestionResultServiceRequest;
import com.ssafy.ssafyro.api.service.interview.response.ArticleResponse;
import com.ssafy.ssafyro.api.service.interview.response.StartResponse;
import com.ssafy.ssafyro.domain.Interview.Interview;
import com.ssafy.ssafyro.domain.Interview.InterviewingRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final InterviewingRepository interviewingRepository;

    public StartResponse startInterview(StartRequest startRequest) {
        return new StartResponse("모집완료");
    }

    public ArticleResponse showArticle(String roomId) {
        return new ArticleResponse("", List.of());
    }

    public void saveQuestionResult(QuestionResultServiceRequest request) {
        Interview interviewing = request.toEntity();
        interviewingRepository.save(interviewing);
    }

}
