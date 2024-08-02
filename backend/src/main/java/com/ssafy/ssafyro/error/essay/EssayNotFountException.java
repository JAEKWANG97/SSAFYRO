package com.ssafy.ssafyro.error.essay;

public class EssayNotFountException extends RuntimeException {

    public EssayNotFountException() {
    }

    public EssayNotFountException(String message) {
        super(message);
    }

    public EssayNotFountException(String message, Throwable cause) {
        super(message, cause);
    }

    public EssayNotFountException(Throwable cause) {
        super(cause);
    }
}
