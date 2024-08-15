package com.ssafy.ssafyro.api.controller.chat.dto;

import jakarta.validation.constraints.NotEmpty;

public record MessageRequest(@NotEmpty String name, @NotEmpty String message) {
}
