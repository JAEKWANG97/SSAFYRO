package com.ssafy.ssafyro.api.service.essay.response;

import com.ssafy.ssafyro.domain.essay.Essay;

public record EssayDetailResponse(Long userId, String content) {

    public EssayDetailResponse(Essay essay) {
        this(essay.getUser().getId(), essay.getContent());
    }
}
