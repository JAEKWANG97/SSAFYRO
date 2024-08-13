package com.ssafy.ssafyro.error.interviewresult;

import com.ssafy.ssafyro.error.NotFoundException;

public class InterviewResultNotFoundException extends NotFoundException {

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
