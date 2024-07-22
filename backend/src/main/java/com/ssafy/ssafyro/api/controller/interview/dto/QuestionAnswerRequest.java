package com.ssafy.ssafyro.api.controller.interview.dto;

import jakarta.validation.constraints.NotEmpty;

public record QuestionAnswerRequest (@NotEmpty String question,
                                     @NotEmpty String answer){
}
