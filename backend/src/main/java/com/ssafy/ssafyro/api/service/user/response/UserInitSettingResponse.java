package com.ssafy.ssafyro.api.service.user.response;

import com.ssafy.ssafyro.domain.MajorType;

public record UserInitSettingResponse(Long userId, MajorType type) {

    public static UserInitSettingResponse of(Long userId, MajorType type) {
        return new UserInitSettingResponse(userId, type);
    }
}
