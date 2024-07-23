package com.ssafy.ssafyro.api.service;


import com.ssafy.ssafyro.api.service.room.request.RoomCreateServiceRequest;
import com.ssafy.ssafyro.api.service.room.request.RoomEnterServiceRequest;
import com.ssafy.ssafyro.api.service.room.request.RoomListServiceRequest;
import com.ssafy.ssafyro.api.service.room.response.RoomCreateResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomEnterResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomListResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomResponse;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class RoomService {
    public RoomResponse getRoomById(int id) {
        return new RoomResponse();
    }

    public RoomCreateResponse createRoom(RoomCreateServiceRequest request) {
        return new RoomCreateResponse();
    }


    public RoomListResponse getRoomList(RoomListServiceRequest request) {
        return new RoomListResponse(List.of());
    }

    public RoomEnterResponse enterRoom(int id, RoomEnterServiceRequest request) {
        return new RoomEnterResponse();
    }
}
