package com.ssafy.ssafyro.api.service.report.response;

import com.ssafy.ssafyro.api.service.report.Expression;
import com.ssafy.ssafyro.domain.room.RoomType;
import java.util.Map;

public record ReportsUserAverageResponse(RoomType roomType,
                                         int totalScore,
                                         int pronunciationScore,
                                         Map<Expression, Double> expressions) {
}
