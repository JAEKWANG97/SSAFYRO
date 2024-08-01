package com.ssafy.ssafyro.api.controller.essay;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.controller.essay.request.EssayReviewRequest;
import com.ssafy.ssafyro.api.controller.essay.request.EssaySaveRequest;
import com.ssafy.ssafyro.api.service.essay.response.EssayReviewResponse;
import com.ssafy.ssafyro.api.service.essay.response.EssaySaveResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class EssayController {

    @PostMapping("/api/v1/essays/review")
    public ApiResult<EssayReviewResponse> reviewEssay(@Valid @RequestBody EssayReviewRequest request) {
        return success(new EssayReviewResponse("첨삭 후 에세이"));
    }

    @PostMapping("/api/v1/essays")
    public ApiResult<EssaySaveResponse> save(@Valid @RequestBody EssaySaveRequest request) {
        return success(new EssaySaveResponse(1L));
    }
}
