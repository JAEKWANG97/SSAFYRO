package com.ssafy.ssafyro.api.service.interview.response;

public record QnAResultCreateResponse(Long userId) {

    public static QnAResultCreateResponse of(Long userId) {
        return new QnAResultCreateResponse(userId);
    }
}
