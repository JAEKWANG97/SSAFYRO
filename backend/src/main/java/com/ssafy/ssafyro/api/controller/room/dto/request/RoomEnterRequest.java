package com.ssafy.ssafyro.api.controller.room.dto.request;

import com.ssafy.ssafyro.api.service.room.request.RoomEnterServiceRequest;

public record RoomEnterRequest(int userId, int roomId) {
    public RoomEnterServiceRequest toServiceRequest() {
        return new RoomEnterServiceRequest(userId, roomId);
    }
}
