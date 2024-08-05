package com.ssafy.ssafyro.domain.room.redis;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.ssafy.ssafyro.domain.room.RoomStatus;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.entity.Room;
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
    private List<Long> userList;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime createdDate;

    @Builder
    private RoomRedis(String title, String description, RoomType type, int capacity) {
        this.id = UUID.randomUUID().toString();
        this.title = title;
        this.description = description;
        this.type = type;
        this.status = RoomStatus.WAIT;
        this.capacity = capacity;
        this.userList = new ArrayList<>();
        this.createdDate = LocalDateTime.now();
    }

    public void startInterview() {
        status = RoomStatus.ING;
    }

    public void finishInterview() {
        status = RoomStatus.END;
    }

    public Room toEntity() {
        return Room.builder()
                .id(id)
                .title(title)
                .type(type)
                .build();
    }

    public void addParticipant(Long userId) {
        userList.add(userId);
    }

    public void removeParticipant(Long userId) {
        userList.remove(userId);
    }

    public String generateKey() {
        return String.format("room:%s:%d:%s:%s", this.type, this.capacity, this.status, this.id);
    }

    @JsonIgnore
    public boolean isRecruiting() {
        return status.isRecruiting();
    }

    @JsonIgnore
    public boolean isEnoughCapacity() {
        return userList.size() < capacity;
    }

}
