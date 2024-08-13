package com.ssafy.ssafyro.api.service.report.response;

import com.ssafy.ssafyro.domain.report.dto.ReportAllScoreAverageDto;
import com.ssafy.ssafyro.domain.room.RoomType;
import java.util.List;

public record ReportsStatisticUserScoreResponse(RoomType roomType,
                                                int allTotalScore,
                                                int allPronunciationScore,
                                                List<ReportAllScoreAverageDto> scores) {

    public record ReportAverageInfo(String title,
                                    int totalScore,
                                    int pronunciationScore) {
    }
}
