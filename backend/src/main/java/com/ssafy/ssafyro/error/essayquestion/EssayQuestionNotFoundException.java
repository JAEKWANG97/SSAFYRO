package com.ssafy.ssafyro.error.essayquestion;

public class EssayQuestionNotFoundException extends RuntimeException {

    public EssayQuestionNotFoundException() {
    }

    public EssayQuestionNotFoundException(String message) {
        super(message);
    }

    public EssayQuestionNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public EssayQuestionNotFoundException(Throwable cause) {
        super(cause);
    }
}
