package com.ssafy.ssafyro.api.service.room.request;

import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.redis.RoomRedis;


public record RoomCreateServiceRequest(String title, String description, String type, int capacity) {

    public RoomRedis toEntity() {
        return RoomRedis.builder()
                .title(title)
                .description(description)
                .type(RoomType.valueOf(type))
                .capacity(capacity)
                .build();
    }

}
