package com.ssafy.ssafyro.api.controller.interview.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record ScoreRequest(@NotEmpty String roomId,
                           @NotEmpty String userId,
                           @NotNull int score) {
}
