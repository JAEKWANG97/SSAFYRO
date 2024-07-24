package com.ssafy.ssafyro.domain;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RoomStatus {
    WAIT("대기"),
    ING("진행중"),
    END("종료");

    private final String text;
}
