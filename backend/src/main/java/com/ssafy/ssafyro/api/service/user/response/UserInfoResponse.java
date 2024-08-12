package com.ssafy.ssafyro.api.service.user.response;

import com.ssafy.ssafyro.domain.MajorType;
import com.ssafy.ssafyro.domain.user.User;

public record UserInfoResponse(String nickname,
                               MajorType type,
                               String profileImageUrl,
                               long personalCnt,
                               long presentationCnt) {

    public static UserInfoResponse of(User user, long personalCnt, long presentationCnt) {
        return new UserInfoResponse(
                user.getNickname(),
                user.getMajorType(),
                user.getProfileImageUrl(),
                personalCnt,
                presentationCnt
        );
    }
}
