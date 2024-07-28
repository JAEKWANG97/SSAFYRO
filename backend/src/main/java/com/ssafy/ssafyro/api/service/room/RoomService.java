package com.ssafy.ssafyro.api.service.room;

import com.ssafy.ssafyro.api.service.room.request.RoomCreateServiceRequest;
import com.ssafy.ssafyro.api.service.room.request.RoomEnterServiceRequest;
import com.ssafy.ssafyro.api.service.room.request.RoomListServiceRequest;
import com.ssafy.ssafyro.api.service.room.response.RoomCreateResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomDetailResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomEnterResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomListResponse;
import com.ssafy.ssafyro.domain.room.redis.RoomRedis;
import com.ssafy.ssafyro.domain.room.redis.RoomRedisRepository;
import com.ssafy.ssafyro.error.room.RoomNotFoundException;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomService {

    private final RoomRedisRepository roomRedisRepository;

    public RoomListResponse getRoomList(RoomListServiceRequest request) {
        List<RoomRedis> rooms = roomRedisRepository.findRooms(request.roomType(),
                request.capacity(), request.status(), request.page(), request.size());

        return RoomListResponse.of(rooms);
    }

    public RoomDetailResponse getRoomById(String id) {

        return roomRedisRepository.findById(id).map(RoomDetailResponse::of)
                .orElseThrow(() -> new RoomNotFoundException("Room not found"));
    }

    public RoomCreateResponse createRoom(RoomCreateServiceRequest request) {
        RoomRedis room = request.toEntity();
        room.addParticipant(request.userId());
        roomRedisRepository.save(room);

        return RoomCreateResponse.of(room.getId());
    }

    public RoomEnterResponse enterRoom(RoomEnterServiceRequest request) {
        RoomRedis room = roomRedisRepository.findById(request.roomId())
                .orElseThrow(() -> new RoomNotFoundException("Room not found"));
        room.addParticipant(request.userId());
        roomRedisRepository.save(room);

        return new RoomEnterResponse();
    }
}
