package com.ssafy.ssafyro.api.controller.room.dto.request;

import com.ssafy.ssafyro.api.service.room.request.RoomEnterServiceRequest;

public record RoomEnterRequest(int userId) {
    public RoomEnterServiceRequest toServiceReaquest(int roomId) {
        return new RoomEnterServiceRequest(userId);
    }
}
