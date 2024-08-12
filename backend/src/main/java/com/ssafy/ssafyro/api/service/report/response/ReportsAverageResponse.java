package com.ssafy.ssafyro.api.service.report.response;

import com.ssafy.ssafyro.api.service.report.Expression;
import com.ssafy.ssafyro.domain.room.RoomType;

public record ReportsAverageResponse(RoomType roomType,
                                     int totalScore,
                                     int pronunciationScore,
                                     Expression expression1,
                                     Expression expression2,
                                     Expression expression3) {
}
