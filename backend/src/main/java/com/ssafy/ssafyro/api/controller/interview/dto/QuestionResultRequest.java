package com.ssafy.ssafyro.api.controller.interview.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record QuestionResultRequest(@NotEmpty String roomId,
                                    @NotEmpty String userId,
                                    @NotEmpty String question,
                                    @NotEmpty String answer,
                                    @NotNull int pronunciation_score,
                                    @NotNull double happy,
                                    @NotNull double disgust,
                                    @NotNull double sad,
                                    @NotNull double surprise,
                                    @NotNull double fear,
                                    @NotNull double angry,
                                    @NotNull double neutral) {
}
