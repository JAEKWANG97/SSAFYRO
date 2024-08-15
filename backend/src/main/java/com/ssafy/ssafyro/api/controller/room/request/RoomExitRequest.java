package com.ssafy.ssafyro.api.controller.room.request;

import com.ssafy.ssafyro.api.service.room.request.RoomExitServiceRequest;
import jakarta.validation.constraints.NotEmpty;

public record RoomExitRequest(@NotEmpty String roomId) {

    public RoomExitServiceRequest toServiceRequest() {
        return new RoomExitServiceRequest(roomId);
    }
}
