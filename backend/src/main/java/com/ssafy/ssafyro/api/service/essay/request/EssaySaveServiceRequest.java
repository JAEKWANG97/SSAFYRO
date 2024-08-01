package com.ssafy.ssafyro.api.service.essay.request;

public record EssaySaveServiceRequest(Long userId,
                                      Long essayQuestionId,
                                      String content) {
}
