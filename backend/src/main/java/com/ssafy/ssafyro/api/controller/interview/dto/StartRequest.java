package com.ssafy.ssafyro.api.controller.interview.dto;

import jakarta.validation.constraints.NotEmpty;

public record StartRequest(@NotEmpty String roomId) {
}
