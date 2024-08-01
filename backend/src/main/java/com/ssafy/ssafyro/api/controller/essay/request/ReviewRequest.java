package com.ssafy.ssafyro.api.controller.essay.request;

import jakarta.validation.constraints.NotEmpty;

public record ReviewRequest(@NotEmpty String content) {
}
