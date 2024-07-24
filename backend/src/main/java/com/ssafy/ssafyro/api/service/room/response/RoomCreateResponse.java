package com.ssafy.ssafyro.api.service.room.response;

public record RoomCreateResponse(Long roomId) {
    public static RoomCreateResponse of(Long roomId) {
        return new RoomCreateResponse(roomId);
    }
} 