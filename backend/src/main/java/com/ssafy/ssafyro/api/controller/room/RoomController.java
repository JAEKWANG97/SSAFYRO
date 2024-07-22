package com.ssafy.ssafyro.api.controller.room;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.controller.room.dto.RoomRequest;
import com.ssafy.ssafyro.api.controller.room.dto.RoomResponse;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoomController {

    @GetMapping("/api/v1/rooms")
    public ApiResult<RoomResponse> getRooms(@ModelAttribute RoomRequest request) {
        return success(new RoomResponse(List.of()));
    }
    
}