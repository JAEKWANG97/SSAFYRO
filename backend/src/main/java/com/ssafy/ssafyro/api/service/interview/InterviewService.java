package com.ssafy.ssafyro.api.service.interview;

import com.ssafy.ssafyro.api.controller.interview.request.StartRequest;
import com.ssafy.ssafyro.api.service.interview.request.QnAResultServiceRequest;
import com.ssafy.ssafyro.api.service.interview.response.ArticleResponse;
import com.ssafy.ssafyro.api.service.interview.response.StartResponse;
import com.ssafy.ssafyro.domain.interview.InterviewRedisRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class InterviewService {

    private final InterviewRedisRepository interviewRedisRepository;

    public StartResponse startInterview(StartRequest startRequest) {
        return new StartResponse("모집완료");
    }

    public ArticleResponse showArticle(String roomId) {
        return new ArticleResponse("", "", List.of());
    }

    public void saveQnAResult(QnAResultServiceRequest request) {
        interviewRedisRepository.save(request.toEntity());
    }
}

