package com.ssafy.ssafyro.api.controller.room.dto.request;


import com.ssafy.ssafyro.api.service.room.request.RoomListServiceRequest;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.web.bind.annotation.RequestParam;

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

