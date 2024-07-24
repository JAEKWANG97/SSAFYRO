package com.ssafy.ssafyro.api.service.room.request;

import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.redis.RoomRedis;
import com.ssafy.ssafyro.domain.room.redis.RoomStatus;
import java.util.List;


public record RoomCreateServiceRequest(Long userId, String title, String description, String type, int capacity) {

    public RoomRedis toEntity() {
        return RoomRedis.builder()
                .title(title)
                .description(description)
                .type(RoomType.valueOf(type))
                .status(RoomStatus.WAIT)
                .capacity(capacity)
                .participantCount(1)
                .userList(List.of(userId))
                .build();
    }

}
