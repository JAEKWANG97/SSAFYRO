package com.ssafy.ssafyro.api.controller.room.dto.request;

import com.ssafy.ssafyro.api.service.room.request.RoomServiceRequest;

public record RoomRequest(int id) {
    public RoomServiceRequest toServiceRequest() {
        return new RoomServiceRequest(id);
    }
}
