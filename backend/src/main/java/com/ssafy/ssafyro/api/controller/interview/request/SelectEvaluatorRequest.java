package com.ssafy.ssafyro.api.controller.interview.request;

import jakarta.validation.constraints.NotNull;

public record SelectEvaluatorRequest(@NotNull Long userId) {
}
