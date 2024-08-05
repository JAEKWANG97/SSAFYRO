package com.ssafy.ssafyro.error.article;

import com.ssafy.ssafyro.error.NotFoundException;

public class ArticleNotFoundException extends NotFoundException {

    public ArticleNotFoundException() {
    }

    public ArticleNotFoundException(String message) {
        super(message);
    }

    public ArticleNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ArticleNotFoundException(Throwable cause) {
        super(cause);
    }
}
