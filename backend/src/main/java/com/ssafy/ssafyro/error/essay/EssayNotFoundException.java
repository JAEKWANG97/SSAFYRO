package com.ssafy.ssafyro.error.essay;

public class EssayNotFoundException extends RuntimeException {

    public EssayNotFoundException() {
    }

    public EssayNotFoundException(String message) {
        super(message);
    }

    public EssayNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public EssayNotFoundException(Throwable cause) {
        super(cause);
    }
}
