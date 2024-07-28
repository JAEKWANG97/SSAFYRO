package com.ssafy.ssafyro.api.service.room.request;


public record RoomListServiceRequest(String roomType, int capacity, String status, int page,
        int size) {
}
