package com.ssafy.ssafyro.api.service.interview;

import com.ssafy.ssafyro.domain.article.Article;
import java.util.List;

public record AiArticle(String title, String content, List<String> question) {

    public AiArticle(String[] result) {
        this(result[0], result[1], List.of(result[2], result[3]));
    }

    public Article toEntity() {
        return Article.builder()
                .title(title)
                .content(content)
                .question(question.get(0))
                .build();
    }
}
