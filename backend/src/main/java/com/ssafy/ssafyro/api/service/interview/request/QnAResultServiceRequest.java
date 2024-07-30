package com.ssafy.ssafyro.api.service.interview.request;

import com.ssafy.ssafyro.domain.interview.InterviewRedis;
import lombok.Builder;

@Builder
public record QnAResultServiceRequest(Long userId,
                                      String question,
                                      String answer,
                                      int pronunciationScore,
                                      double happy,
                                      double disgust,
                                      double sad,
                                      double surprise,
                                      double fear,
                                      double angry,
                                      double neutral) {

    public InterviewRedis toEntity() {
        return InterviewRedis.builder()
                .userId(userId)
                .question(question)
                .answer(answer)
                .pronunciationScore(pronunciationScore)
                .happy(happy)
                .disgust(disgust)
                .sad(sad)
                .surprise(surprise)
                .fear(fear)
                .angry(angry)
                .neutral(neutral)
                .build();
    }
}
