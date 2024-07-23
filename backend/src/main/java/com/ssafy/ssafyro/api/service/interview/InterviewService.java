package com.ssafy.ssafyro.api.service.interview;

import com.ssafy.ssafyro.api.controller.interview.dto.QuestionAnswerRequest;
import com.ssafy.ssafyro.api.controller.interview.dto.QuestionAnswerResponse;
import com.ssafy.ssafyro.api.controller.interview.dto.StartRequest;
import org.springframework.stereotype.Service;

@Service
public class InterviewService {

    public String startInterview(StartRequest startRequest) {
        return "";
    }

    public QuestionAnswerResponse saveQuestionAnswer(QuestionAnswerRequest request) {
        QuestionAnswerResponse response = new QuestionAnswerResponse(request.question(), request.answer());
        return response;
    }
}
