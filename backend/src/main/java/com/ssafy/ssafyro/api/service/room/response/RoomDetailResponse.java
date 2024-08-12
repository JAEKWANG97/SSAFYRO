package com.ssafy.ssafyro.api.service.room.response;

import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.redis.RoomRedis;
import com.ssafy.ssafyro.domain.room.RoomStatus;
import java.util.List;

public record RoomDetailResponse(String title,
                                 String description,
                                 RoomType type,
                                 RoomStatus status,
                                 int capacity,
                                 List<Long> userList,
                                 List<String> userNameList
) {
    public static RoomDetailResponse of(RoomRedis room , List<String> userNameList) {
        return new RoomDetailResponse(
                room.getTitle(),
                room.getDescription(),
                room.getType(),
                room.getStatus(),
                room.getCapacity(),
                room.getUserList(),
                userNameList
        );
    }
}


