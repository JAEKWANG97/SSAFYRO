package com.ssafy.ssafyro.api.service.report.response;

import com.ssafy.ssafyro.domain.report.dto.ReportScoreDto;
import com.ssafy.ssafyro.domain.room.RoomType;
import java.util.List;

public record ReportsStatisticUserScoreResponse(RoomType roomType,
                                                List<ReportScoreDto> scores) {

    public record ReportAverageInfo(String title,
                                    int totalScore,
                                    int pronunciationScore) {
    }
}
