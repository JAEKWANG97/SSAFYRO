package com.ssafy.ssafyro.api.controller.interview.request;

import jakarta.validation.constraints.NotEmpty;

public record FinishRequest(@NotEmpty String roomId) {
}
