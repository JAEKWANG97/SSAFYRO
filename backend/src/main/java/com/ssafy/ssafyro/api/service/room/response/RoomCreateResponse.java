package com.ssafy.ssafyro.api.service.room.response;

public record RoomCreateResponse(String roomId) {
    public static RoomCreateResponse of(String roomId) {
        return new RoomCreateResponse(roomId);
    }
} 