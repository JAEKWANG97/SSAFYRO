package com.ssafy.ssafyro.api.controller.interview.request;

import com.ssafy.ssafyro.api.service.interview.request.QnAResultServiceRequest;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record QnAResultRequest(@NotNull Long userId,
                               @NotEmpty String question,
                               @NotEmpty String answer,
                               @NotNull int pronunciationScore,
                               @NotNull double happy,
                               @NotNull double disgust,
                               @NotNull double sad,
                               @NotNull double surprise,
                               @NotNull double fear,
                               @NotNull double angry,
                               @NotNull double neutral) {

    public QnAResultServiceRequest toServiceRequest() {
        return QnAResultServiceRequest.builder()
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
