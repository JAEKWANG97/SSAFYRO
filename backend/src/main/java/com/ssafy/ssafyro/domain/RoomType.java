package com.ssafy.ssafyro.domain;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RoomType {
    INTERVIEW("인성"),
    PT("PT");

    private final String text;
}
