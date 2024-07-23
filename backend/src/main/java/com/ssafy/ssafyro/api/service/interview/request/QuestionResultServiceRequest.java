package com.ssafy.ssafyro.api.service.interview.request;

import com.ssafy.ssafyro.domain.Interview.Interview;
import lombok.Builder;

@Builder
public record QuestionResultServiceRequest(String roomId,
                                           String userId,
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

    public Interview toEntity() {
        return Interview.builder()
                .roomId(roomId)
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
