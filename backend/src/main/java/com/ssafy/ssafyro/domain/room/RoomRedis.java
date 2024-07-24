package com.ssafy.ssafyro.domain.room;

import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "room")
public class RoomRedis {

    private Long id;

    private String title;

    private String description;

    private RoomType RoomType;

    private int capacity;
}
