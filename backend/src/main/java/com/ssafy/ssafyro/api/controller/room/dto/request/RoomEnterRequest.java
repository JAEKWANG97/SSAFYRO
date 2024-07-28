package com.ssafy.ssafyro.api.controller.room.dto.request;

import com.ssafy.ssafyro.api.service.room.request.RoomEnterServiceRequest;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record RoomEnterRequest(@NotNull Long userId, @NotEmpty String roomId) {

    public RoomEnterServiceRequest toServiceRequest() {
        return new RoomEnterServiceRequest(userId, roomId);
    }
}
