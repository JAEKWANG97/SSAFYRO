package com.ssafy.ssafyro.api.controller.room.request;

import com.ssafy.ssafyro.api.service.room.request.RoomCreateServiceRequest;

public record RoomCreateRequest(String title,
                                String description,
                                String type,
                                int capacity) {

    public RoomCreateServiceRequest toServiceRequest() {
        return new RoomCreateServiceRequest(title, description, type, capacity);
    }
}
