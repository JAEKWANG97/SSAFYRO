package com.ssafy.ssafyro.domain.interview;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InterviewRedis {

    private Long userId;
    private String question;
    private String answer;
    private int pronunciationScore;
    private double happy;
    private double disgust;
    private double sad;
    private double surprise;
    private double fear;
    private double angry;
    private double neutral;

    @Builder
    private InterviewRedis(Long userId, String question, String answer,
                           int pronunciationScore,
                           double happy, double disgust, double sad, double surprise,
                           double fear, double angry, double neutral) {
        this.userId = userId;
        this.question = question;
        this.answer = answer;
        this.pronunciationScore = pronunciationScore;
        this.happy = happy;
        this.disgust = disgust;
        this.sad = sad;
        this.surprise = surprise;
        this.fear = fear;
        this.angry = angry;
        this.neutral = neutral;
    }
}
