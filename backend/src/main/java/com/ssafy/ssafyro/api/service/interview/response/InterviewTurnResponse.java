package com.ssafy.ssafyro.api.service.interview.response;

import com.ssafy.ssafyro.domain.interview.Stage;

public record InterviewTurnResponse(Stage nowStage,
                                    Long nowUserId) {
}
