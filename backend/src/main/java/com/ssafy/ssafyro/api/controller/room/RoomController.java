package com.ssafy.ssafyro.api.controller.room;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.controller.room.dto.RoomRequest;
import com.ssafy.ssafyro.api.controller.room.dto.RoomListResponse;
import com.ssafy.ssafyro.api.controller.room.dto.RoomResponse;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoomController {

    @GetMapping("/api/v1/rooms")
    public ApiResult<RoomListResponse> getRooms(@ModelAttribute RoomRequest request) {
        return success(new RoomListResponse(List.of()));
    }

    @GetMapping("/api/v1/rooms/{id}")
    public ApiResult<RoomResponse> getRoomById(@PathVariable int id) {
        return success(new RoomResponse(1, "title", "description", "roomType", 3));
    }

}