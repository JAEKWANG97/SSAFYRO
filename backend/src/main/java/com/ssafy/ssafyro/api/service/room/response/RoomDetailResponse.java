package com.ssafy.ssafyro.api.service.room.response;

import com.ssafy.ssafyro.domain.room.RoomStatus;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.redis.RoomRedis;
import java.util.List;
import java.util.Map;

public record RoomDetailResponse(String title,
                                 String description,
                                 RoomType type,
                                 RoomStatus status,
                                 int capacity,
                                 List<Long> userList,
                                 Map<Long, String> userNameMap
) {
    public static RoomDetailResponse of(RoomRedis room, Map<Long, String> userNameMap) {
        return new RoomDetailResponse(
                room.getTitle(),
                room.getDescription(),
                room.getType(),
                room.getStatus(),
                room.getCapacity(),
                room.getUserList(),
                userNameMap
        );
    }
}


