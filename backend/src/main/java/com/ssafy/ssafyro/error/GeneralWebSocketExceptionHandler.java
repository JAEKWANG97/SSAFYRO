package com.ssafy.ssafyro.error;

import com.ssafy.ssafyro.error.interview.InterviewStageOutOfException;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
@RequiredArgsConstructor
public class GeneralWebSocketExceptionHandler {

    @MessageExceptionHandler(InterviewStageOutOfException.class)
    @SendTo("/topic/interview/{roomId}")
    public InterviewStageOutOfException handleInterviewStageOutOfException(InterviewStageOutOfException ex) {
        return new InterviewStageOutOfException("모든 순서가 끝났습니다.");
    }

}
