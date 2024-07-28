package com.ssafy.ssafyro.api.service.interview;

import com.ssafy.ssafyro.domain.article.Article;

public record AiArticle(String title, String content, String question) {

    public AiArticle(String[] result) {
        this(result[0], result[1], result[2]);
    }

    public Article toEntity() {
        return Article.builder()
                .title(title)
                .content(content)
                .question(question)
                .build();
    }
}
