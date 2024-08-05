package com.ssafy.ssafyro.domain.room;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RoomStatus {

    WAIT("모집 중"),
    ING("진행 중"),
    END("종료");

    private final String text;
}