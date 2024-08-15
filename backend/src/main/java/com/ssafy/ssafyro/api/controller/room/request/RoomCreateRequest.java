package com.ssafy.ssafyro.api.controller.room.request;

import com.ssafy.ssafyro.api.service.room.request.RoomCreateServiceRequest;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record RoomCreateRequest(@NotEmpty String title,
                                @NotEmpty String description,
                                @NotEmpty String type,
                                @NotNull int capacity) {

    public RoomCreateServiceRequest toServiceRequest() {
        return new RoomCreateServiceRequest(title, description, type, capacity);
    }
}
