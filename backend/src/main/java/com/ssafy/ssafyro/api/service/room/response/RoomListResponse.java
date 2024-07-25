package com.ssafy.ssafyro.api.service.room.response;

import com.ssafy.ssafyro.domain.room.redis.RoomRedis;
import java.util.List;

public record RoomListResponse(List<RoomRedis> rooms) {

    public static RoomListResponse of(List<RoomRedis> rooms) {
        return new RoomListResponse(rooms);
    }
}
