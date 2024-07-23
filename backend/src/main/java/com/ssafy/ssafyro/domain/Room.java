package com.ssafy.ssafyro.domain;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import org.springframework.data.redis.core.RedisHash;

@RedisHash("User")
@Table(name = "rooms")
public class Room {

    private Long id;

    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    private RoomType RoomType;

    private int capacity;
}
