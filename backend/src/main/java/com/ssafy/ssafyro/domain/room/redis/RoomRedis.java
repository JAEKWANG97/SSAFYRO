package com.ssafy.ssafyro.domain.room.redis;

import com.ssafy.ssafyro.domain.room.RoomType;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomRedis {

    private String id;
    private String title;
    private String description;
    private RoomType type;
    private RoomStatus status;
    private int capacity;
    private int participantCount;
    private List<Long> userList;
    private LocalDateTime createdDate;

    @Builder
    private RoomRedis(String title, String description, RoomType type, int capacity) {
        this.id = UUID.randomUUID().toString();
        this.title = title;
        this.description = description;
        this.type = type;
        this.status = RoomStatus.WAIT;
        this.capacity = capacity;
        this.participantCount = 0;
        this.userList = new ArrayList<>();
        this.createdDate = LocalDateTime.now();
    }

    public void startInterview() {
        status = RoomStatus.ING;
    }

    public void endInterview() {
        status = RoomStatus.END;
    }

    public String generateKey() {
        return String.format("room:%s:%d:%s:%s", this.type, this.capacity, this.status, this.id);
    }
}
