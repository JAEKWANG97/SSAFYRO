package com.ssafy.ssafyro.api.controller.openvidu.request;

import jakarta.validation.constraints.NotEmpty;

public record TokenRequest(@NotEmpty String roomName,
                           @NotEmpty String participantName) {
}
