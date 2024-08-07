package com.ssafy.ssafyro.domain.room;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Stage {

    FIRST(0),
    SECOND(1),
    THIRD(2);

    private final int index;

}
