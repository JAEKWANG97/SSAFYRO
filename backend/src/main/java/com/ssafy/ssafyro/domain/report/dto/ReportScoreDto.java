package com.ssafy.ssafyro.domain.report.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReportScoreDto {

    private int totalScore;
    private int pronunciationScore;

    @QueryProjection
    public ReportScoreDto(int totalScore, int pronunciationScore) {
        this.totalScore = totalScore;
        this.pronunciationScore = pronunciationScore;
    }
}
