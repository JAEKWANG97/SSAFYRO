package com.ssafy.ssafyro.domain.interview;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Stage {

    FIRST(1),
    SECOND(2),
    THIRD(3);

    private final int stage;

    public int getNowStageIndex() {
        return this.getStage() - 1;
    }
}
