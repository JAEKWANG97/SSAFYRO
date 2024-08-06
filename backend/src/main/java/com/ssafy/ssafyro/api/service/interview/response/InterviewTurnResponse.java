package com.ssafy.ssafyro.api.service.interview.response;

import lombok.RequiredArgsConstructor;

public record InterviewTurnResponse(Integer nowTurn,
                                    Long userId,
                                    TurnStatus turnStatus) {

    @RequiredArgsConstructor
    public enum TurnStatus {
        END("모든 순서가 종료되었습니다."),
        ING("다음 순서를 호출합니다.");

        private final String text;
    }

}
