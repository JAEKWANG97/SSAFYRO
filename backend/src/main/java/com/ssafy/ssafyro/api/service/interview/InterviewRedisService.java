package com.ssafy.ssafyro.api.service.interview;

import com.ssafy.ssafyro.api.controller.interview.dto.QuestionAnswerRequest;
import com.ssafy.ssafyro.api.controller.interview.dto.QuestionAnswerResponse;
import org.springframework.stereotype.Service;

@Service
public class InterviewRedisService {

    public QuestionAnswerResponse saveQuestionAnswer(QuestionAnswerRequest request) {
        QuestionAnswerResponse response = new QuestionAnswerResponse(request.question(), request.answer());
        return response;
    }
}
