package com.ssafy.ssafyro.api.controller.user.request;

import com.ssafy.ssafyro.domain.MajorType;
import jakarta.validation.constraints.NotNull;

public record UserInitSettingRequest(@NotNull MajorType type) {
}
