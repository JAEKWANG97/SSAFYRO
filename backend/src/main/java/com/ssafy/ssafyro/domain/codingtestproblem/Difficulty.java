package com.ssafy.ssafyro.domain.codingtestproblem;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Difficulty {

    D1("1단계"),
    D2("2단계"),
    D3("3단계"),
    D4("4단계"),
    D5("5단계"),
    D6("6단계"),
    D7("7단계"),
    D8("8단계");

    private final String text;
}
