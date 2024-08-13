package com.ssafy.ssafyro.domain.report.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReportExpressionDto {

    private double happy;
    private double disgust;
    private double sad;
    private double surprise;
    private double fear;
    private double angry;
    private double neutral;

    @QueryProjection
    public ReportExpressionDto(double happy, double disgust, double sad, double surprise, double fear, double angry,
                               double neutral) {
        this.happy = happy;
        this.disgust = disgust;
        this.sad = sad;
        this.surprise = surprise;
        this.fear = fear;
        this.angry = angry;
        this.neutral = neutral;
    }
}
