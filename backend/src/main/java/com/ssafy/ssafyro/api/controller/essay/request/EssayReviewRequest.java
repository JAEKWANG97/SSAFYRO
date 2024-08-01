package com.ssafy.ssafyro.api.controller.essay.request;

import jakarta.validation.constraints.NotEmpty;

public record EssayReviewRequest(@NotEmpty String content) {
}
