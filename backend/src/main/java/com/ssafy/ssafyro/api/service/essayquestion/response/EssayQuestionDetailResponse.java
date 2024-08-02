package com.ssafy.ssafyro.api.service.essayquestion.response;

import com.ssafy.ssafyro.domain.essayquestion.EssayQuestion;

public record EssayQuestionDetailResponse(Long id,
                                          String content,
                                          Integer characterLimit) {

    public EssayQuestionDetailResponse(EssayQuestion question) {
        this(question.getId(), question.getContent(), question.getCharacterLimit());
    }
}
