package com.ssafy.ssafyro.config.rabbitmq;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RabbitMqElement {

    PERSONALITY_QUEUE("personality"),
    PRESENTATION_QUEUE("presentation"),
    EXCHANGE("exchange"),
    PERSONALITY_KEY("personalityKey"),
    PRESENTATION_KEY("presentationKey");

    private final String text;

}
