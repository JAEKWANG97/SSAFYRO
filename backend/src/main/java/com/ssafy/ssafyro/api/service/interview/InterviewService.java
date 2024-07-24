package com.ssafy.ssafyro.api.service.interview;

import com.ssafy.ssafyro.api.controller.interview.request.StartRequest;
import com.ssafy.ssafyro.api.service.interview.request.QnAResultServiceRequest;
import com.ssafy.ssafyro.api.service.interview.response.ArticleResponse;
import com.ssafy.ssafyro.api.service.interview.response.StartResponse;
import com.ssafy.ssafyro.domain.Interview.InterviewRedis;
import com.ssafy.ssafyro.domain.Interview.InterviewRedisRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final InterviewRedisRepository interviewRepository;

    public StartResponse startInterview(StartRequest startRequest) {
        return new StartResponse("모집완료");
    }

    public ArticleResponse showArticle(String roomId) {
        return new ArticleResponse("", "", List.of());
    }

    public void saveQnAResult(QnAResultServiceRequest request) {
        InterviewRedis interview = request.toEntity();
        interviewRepository.save(interview);
    }

}
