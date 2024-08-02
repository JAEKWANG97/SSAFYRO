package com.ssafy.ssafyro.api.service.room.request;


import com.ssafy.ssafyro.domain.room.RoomFilterCondition;

public record RoomListServiceRequest(String title,
                                     String roomType,
                                     Integer capacity,
                                     String status,
                                     int page,
                                     int size) {

    public RoomFilterCondition toFilterCondition() {
        return RoomFilterCondition.builder()
                .title(title)
                .type(roomType)
                .capacity(capacity)
                .status(status)
                .build();
    }
}
