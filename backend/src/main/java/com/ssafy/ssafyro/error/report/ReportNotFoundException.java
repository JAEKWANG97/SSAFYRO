package com.ssafy.ssafyro.error.report;

public class ReportNotFoundException extends RuntimeException {
    public ReportNotFoundException() {
    }

    public ReportNotFoundException(String message) {
        super(message);
    }

    public ReportNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ReportNotFoundException(Throwable cause) {
        super(cause);
    }
}
