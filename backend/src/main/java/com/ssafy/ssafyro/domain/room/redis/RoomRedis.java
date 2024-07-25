package com.ssafy.ssafyro.domain.room.redis;

import jakarta.persistence.GeneratedValue;
import java.util.List;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import com.ssafy.ssafyro.domain.room.RoomType;


import lombok.Builder;


@RedisHash(value = "room")
@Getter
public class RoomRedis {

    @Id
    private Long id;

    private final String title;
    private final String description;
    private final RoomType type;
    private final RoomStatus status;
    private final int capacity;
    private final int participantCount;
    private final List<Long> userList;

    @Builder
    private RoomRedis(Long id, String title, String description, RoomType type, RoomStatus status,
                      int capacity, int participantCount, List<Long> userList) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
        this.status = status;
        this.capacity = capacity;
        this.participantCount = participantCount;
        this.userList = userList;
    }

}