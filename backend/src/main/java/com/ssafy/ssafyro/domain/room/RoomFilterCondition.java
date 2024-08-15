package com.ssafy.ssafyro.domain.room;

import lombok.Builder;

@Builder
public record RoomFilterCondition(String title, String type, Integer capacity, String status, int page, int size) {
}
