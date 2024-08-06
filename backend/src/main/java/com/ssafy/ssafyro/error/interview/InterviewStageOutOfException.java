package com.ssafy.ssafyro.error.interview;

public class InterviewStageOutOfException extends RuntimeException {

    public InterviewStageOutOfException() {
        super();
    }

    public InterviewStageOutOfException(String message) {
        super(message);
    }

    public InterviewStageOutOfException(String message, Throwable cause) {
        super(message, cause);
    }

    public InterviewStageOutOfException(Throwable cause) {
        super(cause);
    }
}
