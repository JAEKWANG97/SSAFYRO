package com.ssafy.ssafyro.api.service;


import com.ssafy.ssafyro.api.service.room.request.RoomCreateServiceRequest;
import com.ssafy.ssafyro.api.service.room.request.RoomEnterServiceRequest;
import com.ssafy.ssafyro.api.service.room.request.RoomListServiceRequest;
import com.ssafy.ssafyro.api.service.room.response.RoomCreateResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomDetailResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomEnterResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomListResponse;
import com.ssafy.ssafyro.domain.room.redis.RoomRedisRepository;
import com.ssafy.ssafyro.error.room.RoomNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRedisRepository roomRedisRepository;

    public RoomListResponse getRoomList(RoomListServiceRequest request) {

        return new RoomListResponse(List.of());
    }

    public RoomDetailResponse getRoomById(String id) {
        return roomRedisRepository.findById(id)
                .map(RoomDetailResponse::of)
                .orElseThrow(() -> new RoomNotFoundException("Room not found"));
    }


    public RoomCreateResponse createRoom(RoomCreateServiceRequest request) {
        String key = roomRedisRepository.save(request.toEntity());
        return RoomCreateResponse.of(key);
    }

    public RoomEnterResponse enterRoom(RoomEnterServiceRequest request) {
        return new RoomEnterResponse();
    }
}
