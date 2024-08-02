package com.ssafy.ssafyro.api.service.essayquestion.request;

import com.ssafy.ssafyro.domain.MajorType;

public record EssayQuestionDetailServiceRequest(MajorType type, Integer generation) {
}
