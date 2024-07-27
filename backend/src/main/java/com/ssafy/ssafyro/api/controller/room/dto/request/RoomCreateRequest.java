package com.ssafy.ssafyro.api.controller.room.dto.request;

import com.ssafy.ssafyro.api.service.room.request.RoomCreateServiceRequest;

public record RoomCreateRequest(Long userId, String title, String description, String type,
        int capacity) {

    public RoomCreateServiceRequest toServiceRequest() {
        return new RoomCreateServiceRequest(userId, title, description, type, capacity);
    }
}
