package com.ssafy.ssafyro.api.controller.report.request;

import com.ssafy.ssafyro.api.service.report.request.ReportsScoreServiceRequest;
import com.ssafy.ssafyro.domain.room.RoomType;
import jakarta.validation.constraints.NotNull;

public record ReportsScoreRequest(@NotNull RoomType roomType) {

    public ReportsScoreServiceRequest toServiceRequest() {
        return new ReportsScoreServiceRequest(roomType);
    }
}
