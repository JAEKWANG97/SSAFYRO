package com.ssafy.ssafyro.domain.Interview;

import jakarta.persistence.Id;
import lombok.Builder;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "interview", timeToLive = 600)
public class InterviewRedis {

    @Id
    private String id;
    private String roomId;
    private String userId;
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
    private InterviewRedis(String roomId, String userId, String question, String answer, int pronunciationScore,
                           double happy,
                           double disgust, double sad, double surprise, double fear, double angry, double neutral) {
        this.roomId = roomId;
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
