package com.ssafy.ssafyro.api.controller.chat.dto;

public record NotificationResponse(String content) {

    public static NotificationResponse of(String content) {
        return new NotificationResponse(content);
    }
}
