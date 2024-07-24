package com.ssafy.ssafyro.api.service.room.request;

public record RoomCreateServiceRequest(String title, String description, String type, int capacity) {
}
