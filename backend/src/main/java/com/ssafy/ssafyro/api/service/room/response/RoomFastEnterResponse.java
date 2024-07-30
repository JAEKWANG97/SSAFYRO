package com.ssafy.ssafyro.api.service.room.response;

public record RoomFastEnterResponse(boolean isExisting, String roomId) {

    public static RoomFastEnterResponse notExisting() {
        return new RoomFastEnterResponse(false, null);
    }
}
