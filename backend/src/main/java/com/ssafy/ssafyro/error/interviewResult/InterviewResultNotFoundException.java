package com.ssafy.ssafyro.error.interviewResult;

public class InterviewResultNotFoundException extends RuntimeException {
    public InterviewResultNotFoundException() {
    }

    public InterviewResultNotFoundException(String message) {
        super(message);
    }

    public InterviewResultNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public InterviewResultNotFoundException(Throwable cause) {
        super(cause);
    }
}
