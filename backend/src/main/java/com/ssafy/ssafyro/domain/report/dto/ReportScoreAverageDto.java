package com.ssafy.ssafyro.domain.report.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.ssafyro.api.service.report.response.ReportsAverageResponse;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResult;
import com.ssafy.ssafyro.domain.room.RoomType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReportScoreAverageDto {

    private double totalScore;
    private double pronunciationScore;
    private double happy;
    private double disgust;
    private double sad;
    private double surprise;
    private double fear;
    private double angry;
    private double neutral;

    @QueryProjection
    public ReportScoreAverageDto(double totalScore, double pronunciationScore, double happy, double disgust, double sad,
                                 double surprise, double fear, double angry, double neutral) {
        this.totalScore = totalScore;
        this.pronunciationScore = pronunciationScore;
        this.happy = happy;
        this.disgust = disgust;
        this.sad = sad;
        this.surprise = surprise;
        this.fear = fear;
        this.angry = angry;
        this.neutral = neutral;
    }

    public ReportsAverageResponse toResponse(RoomType roomType) {
        return new ReportsAverageResponse(
                roomType,
                (int) Math.round(totalScore),
                (int) Math.round(pronunciationScore),
                InterviewResult.builder()
                        .happy(happy)
                        .disgust(disgust)
                        .sad(sad)
                        .surprise(surprise)
                        .fear(fear)
                        .angry(angry)
                        .neutral(neutral)
                        .build()
                        .getTop3Expression()
        );
    }
}
