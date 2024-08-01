package com.ssafy.ssafyro.api.controller.essay;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.controller.essay.request.ReviewRequest;
import com.ssafy.ssafyro.api.service.essay.response.ReviewResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class EssayController {

    @PostMapping("/api/v1/essay/review")
    public ApiResult<ReviewResponse> reviewEssay(@RequestBody ReviewRequest request) {
        return success(new ReviewResponse("첨삭 후 에세이"));
    }
}
