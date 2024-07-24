package com.ssafy.ssafyro.domain;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum MajorType {

    MAJOR("전공"),
    NON_MAJOR("비전공");

    private final String text;
}
