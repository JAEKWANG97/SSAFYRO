package com.ssafy.ssafyro.api.service.article.response;

import com.ssafy.ssafyro.domain.article.Article;

public record ArticleResponse(String title,
                              String content,
                              String question) {

    public ArticleResponse(Article article) {
        this(
                article.getTitle(),
                article.getContent(),
                article.getQuestion()
        );
    }

}
