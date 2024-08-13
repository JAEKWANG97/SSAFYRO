package com.ssafy.ssafyro.api.service.report.response;

import com.ssafy.ssafyro.domain.room.RoomType;

public record ReportStatisticAllScoreResponse(RoomType roomType,
                                              int allTotalScore,
                                              int allPronunciationScore) {
}
