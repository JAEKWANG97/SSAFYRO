package com.ssafy.ssafyro.api.controller.interview.request;

import com.ssafy.ssafyro.api.service.interview.request.QuestionResultServiceRequest;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record QuestionResultRequest(@NotEmpty String roomId,
                                    @NotEmpty String userId,
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

    public QuestionResultServiceRequest toServiceRequest() {
        return QuestionResultServiceRequest.builder()
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
