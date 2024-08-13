package com.ssafy.ssafyro.api.controller.codingtestproblem.request;

import jakarta.validation.constraints.NotNull;

public record CodingTestProblemScrapRequest(@NotNull Long problemId) {
}
