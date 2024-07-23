package com.ssafy.ssafyro.api.controller.interview.request;

import jakarta.validation.constraints.NotEmpty;

public record StartRequest(@NotEmpty String roomId) {
}
