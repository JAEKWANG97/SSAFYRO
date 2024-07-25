package com.ssafy.ssafyro.api.service.room.response;

import com.ssafy.ssafyro.domain.room.redis.RoomRedis;

public record RoomDetailResponse(RoomRedis room) {

    public static RoomDetailResponse of(RoomRedis room) {
        return new RoomDetailResponse(room);
    }
}
