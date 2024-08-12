package com.ssafy.ssafyro.api.service.user.response;

import com.ssafy.ssafyro.domain.MajorType;

public record UserInfoResponse(String nickname,
                               MajorType type,
                               String profileImageUrl,
                               int personalCnt,
                               int presentationCnt) {
}
