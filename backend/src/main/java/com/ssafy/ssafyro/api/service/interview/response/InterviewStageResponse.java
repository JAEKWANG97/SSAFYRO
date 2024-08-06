package com.ssafy.ssafyro.api.service.interview.response;

import com.ssafy.ssafyro.domain.interview.Stage;

public record InterviewStageResponse(Stage nowStage,
                                     Long nowUserId) {
}
