package com.ssafy.ssafyro.domain.room.redis;

import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "room")
public class RoomRedis {

    private Long id;

    private String title;

    private String description;

    private com.ssafy.ssafyro.domain.room.RoomType RoomType;

    private int capacity;
}
