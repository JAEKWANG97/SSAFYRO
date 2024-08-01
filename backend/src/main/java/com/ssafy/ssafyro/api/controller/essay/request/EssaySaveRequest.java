package com.ssafy.ssafyro.api.controller.essay.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record EssaySaveRequest(@NotNull Long userId,
                               @NotNull Long essayQuestionId,
                               @NotEmpty String content) {
}
