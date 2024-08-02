package com.ssafy.ssafyro.api.controller.chat.dto;

public record MessageResponse(String name, String message) {

    public static MessageResponse of(String name, String message) {
        return new MessageResponse(name, message);
    }
}
