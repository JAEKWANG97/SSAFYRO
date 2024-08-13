package com.ssafy.ssafyro.api.service.report.response;

import com.ssafy.ssafyro.domain.report.dto.ReportAllScoreDto;
import com.ssafy.ssafyro.domain.room.RoomType;
import java.util.List;

public record ReportsStatisticScoreResponse(RoomType roomType,
                                            int allTotalScore,
                                            int allPronunciationScore,
                                            List<ReportAllScoreDto> scores) {

    public record ReportAverageInfo(String title,
                                    int totalScore,
                                    int pronunciationScore) {
    }
}
