package com.ssafy.ssafyro.api.controller.room;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.controller.room.dto.request.RoomCreateRequest;
import com.ssafy.ssafyro.api.controller.room.dto.request.RoomEnterRequest;
import com.ssafy.ssafyro.api.controller.room.dto.request.RoomListRequest;
import com.ssafy.ssafyro.api.service.RoomService;
import com.ssafy.ssafyro.api.service.room.response.RoomCreateResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomDetailResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomEnterResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping("/api/v1/rooms")
    public ApiResult<RoomListResponse> getRooms(@ModelAttribute RoomListRequest request) {
        return success(roomService.getRoomList(request.toServiceRequest()));
    }

    @GetMapping("/api/v1/rooms/{id}")
    public ApiResult<RoomDetailResponse> getRoomById(@PathVariable String id) {
        return success(roomService.getRoomById(id));
    }

    @PostMapping("/api/v1/rooms")
    public ApiResult<RoomCreateResponse> createRoom(@RequestBody RoomCreateRequest request) {
        return success(roomService.createRoom(request.toServiceRequest()));
    }

    @PostMapping("/api/v1/rooms/enter")
    public ApiResult<RoomEnterResponse> enterRoom(@RequestBody RoomEnterRequest request) {
        return success(roomService.enterRoom(request.toServiceRequest()));
    }

}