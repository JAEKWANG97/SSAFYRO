package com.ssafy.ssafyro.api.controller.interview.request;

import com.ssafy.ssafyro.api.service.interview.request.InterviewTurnServiceRequest;
import org.springframework.boot.context.properties.bind.DefaultValue;

public record InterviewTurnRequest(@DefaultValue("-1") Integer nowTurn) {

    public InterviewTurnServiceRequest toServiceRequest() {
        return new InterviewTurnServiceRequest(nowTurn);
    }
}
