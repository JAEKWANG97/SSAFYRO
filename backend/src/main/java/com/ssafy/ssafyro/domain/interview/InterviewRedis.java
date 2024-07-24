package com.ssafy.ssafyro.domain.interview;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
//@RedisHash(value = "interview", timeToLive = 600)
public class InterviewRedis {

    //    @Id
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

}
