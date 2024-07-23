package com.ssafy.ssafyro.api.controller.room.dto.request;


import com.ssafy.ssafyro.api.service.room.request.RoomListServiceRequest;

public record RoomListRequest(String roomType, int capacity) {
    public RoomListServiceRequest toServiceRequest() {
        return new RoomListServiceRequest(roomType, capacity);
    }
}
