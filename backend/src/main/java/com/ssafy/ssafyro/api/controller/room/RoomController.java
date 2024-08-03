package com.ssafy.ssafyro.api.controller.room;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.controller.room.request.RoomCreateRequest;
import com.ssafy.ssafyro.api.controller.room.request.RoomEnterRequest;
import com.ssafy.ssafyro.api.controller.room.request.RoomExitRequest;
import com.ssafy.ssafyro.api.controller.room.request.RoomListRequest;
import com.ssafy.ssafyro.api.service.room.RoomService;
import com.ssafy.ssafyro.api.service.room.response.RoomCreateResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomDetailResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomEnterResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomExitResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomFastEnterResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping("/api/v1/rooms")
    public ApiResult<RoomListResponse> getRooms(@RoomFiter RoomListRequest request) {
        return success(roomService.getRooms(request.toServiceRequest()));
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

    @PostMapping("/api/v1/rooms/exit")
    public ApiResult<RoomExitResponse> exitRoom(@RequestBody RoomExitRequest request) {
        return success(roomService.exitRoom(request.toServiceRequest()));
    }

    @GetMapping("/api/v1/rooms/fast-enter")
    public ApiResult<RoomFastEnterResponse> fastEnterRoom(@RequestParam String type) {
        return success(roomService.fastRoomEnter(type));
    }

}
