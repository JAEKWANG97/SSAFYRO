package com.ssafy.ssafyro.domain.report.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReportAllScoreDto {

    private String title;
    private double totalScore;
    private double pronunciationScore;

    @QueryProjection
    public ReportAllScoreDto(String title, double totalScore, double pronunciationScore) {
        this.title = title;
        this.totalScore = totalScore;
        this.pronunciationScore = pronunciationScore;
    }
}
