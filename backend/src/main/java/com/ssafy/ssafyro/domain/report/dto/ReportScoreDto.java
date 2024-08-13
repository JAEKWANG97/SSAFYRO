package com.ssafy.ssafyro.domain.report.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReportScoreDto {

    private String title;
    private int totalScore;
    private int pronunciationScore;

    @QueryProjection
    public ReportScoreDto(String title, int totalScore, int pronunciationScore) {
        this.title = title;
        this.totalScore = totalScore;
        this.pronunciationScore = pronunciationScore;
    }
}
