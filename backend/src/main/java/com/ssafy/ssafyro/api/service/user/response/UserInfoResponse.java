package com.ssafy.ssafyro.api.service.user.response;

import com.ssafy.ssafyro.domain.MajorType;
import com.ssafy.ssafyro.domain.user.User;

public record UserInfoResponse(String nickname,
                               MajorType type,
                               String profileImageUrl,
                               int personalCount,
                               int presentationCount) {

    public static UserInfoResponse of(User user, int personalCount, int presentationCount) {
        return new UserInfoResponse(
                user.getNickname(),
                user.getMajorType(),
                user.getProfileImageUrl(),
                personalCount,
                presentationCount
        );
    }
}
