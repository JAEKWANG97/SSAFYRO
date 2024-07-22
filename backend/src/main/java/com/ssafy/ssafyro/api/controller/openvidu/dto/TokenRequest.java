package com.ssafy.ssafyro.api.controller.openvidu.dto;

import jakarta.validation.constraints.NotEmpty;

public record TokenRequest(@NotEmpty String roomName,
                           @NotEmpty String participantName) {
}
