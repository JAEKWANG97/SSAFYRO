package com.ssafy.ssafyro.api.controller.room.dto;

public record RoomCreateRequest(String title, String description, String type, int capacity) {
}
