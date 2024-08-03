package com.ssafy.ssafyro.api.controller.room.request;


import com.ssafy.ssafyro.api.service.room.request.RoomListServiceRequest;
import jakarta.validation.constraints.Min;

public record RoomListRequest(String title,
                              String type,
                              Integer capacity,
                              String status,
                              @Min(1) int page,
                              @Min(1) int size
) {

    public RoomListServiceRequest toServiceRequest() {
        return new RoomListServiceRequest(title, type, capacity, status, page, size);
    }
}

