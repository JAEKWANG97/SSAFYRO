package com.ssafy.ssafyro.api.controller.room.dto;

public record RoomResponse(int id, String title, String description, String roomType, int capacity) {
}
