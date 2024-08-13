package com.ssafy.ssafyro.domain.report.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.ssafyro.api.service.report.response.ReportsStatisticUsersScoreResponse;
import com.ssafy.ssafyro.domain.room.RoomType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReportAllScoreAverageDto {

    private double totalScore;
    private double pronunciationScore;

    @QueryProjection
    public ReportAllScoreAverageDto(double totalScore, double pronunciationScore) {
        this.totalScore = totalScore;
        this.pronunciationScore = pronunciationScore;
    }

    public ReportsStatisticUsersScoreResponse toResponse(RoomType roomType) {
        return new ReportsStatisticUsersScoreResponse(
                roomType,
                totalScore,
                pronunciationScore
        );
    }
}
