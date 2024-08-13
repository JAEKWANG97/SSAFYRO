package com.ssafy.ssafyro.api.service.report.response;

import com.ssafy.ssafyro.domain.room.RoomType;

public record ReportsStatisticUsersScoreResponse(RoomType roomType,
                                                 double allTotalScore,
                                                 double allPronunciationScore) {
}
