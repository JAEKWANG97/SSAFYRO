package com.ssafy.ssafyro.error.codingtestproblem;

public class CodingTestProblemNotFoundException extends RuntimeException {

    public CodingTestProblemNotFoundException() {
    }

    public CodingTestProblemNotFoundException(String message) {
        super(message);
    }

    public CodingTestProblemNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public CodingTestProblemNotFoundException(Throwable cause) {
        super(cause);
    }
}
