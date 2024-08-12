package com.ssafy.ssafyro.api.service.interview.response;

import java.util.List;

public record ExitResponse(List<Long> userList) {
    public static ExitResponse of(List<Long> userList) {
        return new ExitResponse(userList);
    }
}
