package com.ssafy.ssafyro.api.controller.essayquestion;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.controller.essayquestion.request.EssayQuestionDetailRequest;
import com.ssafy.ssafyro.api.service.essayquestion.response.EssayQuestionDetailResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class EssayQuestionController {

    @GetMapping("/api/v1/essay-questions")
    public ApiResult<EssayQuestionDetailResponse> findByMajorTypeAndGeneration(
            @ModelAttribute EssayQuestionDetailRequest request) {
        return success(
                new EssayQuestionDetailResponse(1L, "에세이 질문", 600)
        );
    }
}
