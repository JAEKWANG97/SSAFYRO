package com.ssafy.ssafyro.api.service.room.response;

import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.redis.RoomRedis;
import com.ssafy.ssafyro.domain.room.redis.RoomStatus;
import java.util.List;

public record RoomListResponse(List<RoomInfo> rooms) {

    public static RoomListResponse of(List<RoomRedis> roomRedisList) {

        return new RoomListResponse(
                roomRedisList.stream()
                        .map(RoomInfo::new)
                        .toList()
        );
    }

    private record RoomInfo(String id,
                            String title,
                            String description,
                            RoomType type,
                            RoomStatus status,
                            int capacity,
                            int participantCount) {

        public RoomInfo(RoomRedis room) {
            this(
                    room.getId(),
                    room.getTitle(),
                    room.getDescription(),
                    room.getType(),
                    room.getStatus(),
                    room.getCapacity(),
                    room.getUserList().size()
            );
        }
    }
}
