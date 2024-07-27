package com.ssafy.ssafyro.domain.room.redis;

import com.ssafy.ssafyro.domain.room.RoomType;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RedisHash(value = "room")
public class RoomRedis {

    @Id
    private String id;
    private String title;
    private String description;
    private RoomType type;
    private RoomStatus status;
    private int capacity;
    private int participantCount;
    private List<Long> userList;

    @Builder
    private RoomRedis(String id, String title, String description, RoomType type, RoomStatus status,
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

    public void startInterview() {
        status = RoomStatus.ING;
    }

    public void endInterview() {
        status = RoomStatus.END;
    }
}