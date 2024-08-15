package com.ssafy.ssafyro.api.service.article.response;

import com.ssafy.ssafyro.domain.article.Article;
import java.util.List;

public record ArticleResponse(String title,
                              String content,
                              List<String> question) {

    public ArticleResponse(Article article) {
        this(
                article.getTitle(),
                article.getContent(),
                List.of(article.getQuestion1(), article.getQuestion2())
        );
    }

}
