package com.ssafy.ssafyro.api.service.report.response;

import com.ssafy.ssafyro.api.service.report.Expression;
import com.ssafy.ssafyro.domain.room.RoomType;
import java.util.Map;

public record ReportsStatisticExpressionResponse(RoomType roomType,
                                                 Map<Expression, Double> expressions) {

    public static ReportsStatisticExpressionResponse of(RoomType roomType, Map<Expression, Double> expressions) {
        return new ReportsStatisticExpressionResponse(roomType, expressions);
    }
}
