package com.ssafy.ssafyro.domain.room;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RoomType {

    PERSONALITY("인성"),
    PRESENTATION("PT");

    private final String text;
}
