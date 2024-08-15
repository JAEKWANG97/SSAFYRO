package com.ssafy.ssafyro.api.controller.room.request;

import com.ssafy.ssafyro.api.service.room.request.RoomEnterServiceRequest;
import jakarta.validation.constraints.NotEmpty;

public record RoomEnterRequest(@NotEmpty String roomId) {

    public RoomEnterServiceRequest toServiceRequest() {
        return new RoomEnterServiceRequest(roomId);
    }
}
