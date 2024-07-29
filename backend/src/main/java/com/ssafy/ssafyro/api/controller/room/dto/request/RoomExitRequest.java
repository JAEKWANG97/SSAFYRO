package com.ssafy.ssafyro.api.controller.room.dto.request;

import com.ssafy.ssafyro.api.service.room.request.RoomExitServiceRequest;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record RoomExitRequest(@NotEmpty String roomId, @NotNull Long userId) {

    public RoomExitServiceRequest toServiceRequest() {
        return new RoomExitServiceRequest(roomId, userId);
    }
}
