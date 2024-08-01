package com.ssafy.ssafyro.api.service.essayquestion.response;

public record EssayQuestionDetailResponse(Long id,
                                          String content,
                                          Integer characterLimit) {
}
