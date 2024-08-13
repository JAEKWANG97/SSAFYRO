package com.ssafy.ssafyro.api.controller.report.request;

import com.ssafy.ssafyro.api.service.report.request.ReportsAverageServiceRequest;
import com.ssafy.ssafyro.domain.room.RoomType;
import jakarta.validation.constraints.NotNull;

public record ReportsAverageRequest(@NotNull RoomType roomType) {

    public ReportsAverageServiceRequest toServiceRequest() {
        return new ReportsAverageServiceRequest(roomType);
    }
}
