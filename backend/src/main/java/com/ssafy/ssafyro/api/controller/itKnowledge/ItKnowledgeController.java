package com.ssafy.ssafyro.api.controller.itKnowledge;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.controller.itKnowledge.dto.ItKnowledgeDetailRequest;
import com.ssafy.ssafyro.api.controller.itKnowledge.dto.ItKnowledgeListRequest;
import com.ssafy.ssafyro.api.service.itKnowledge.ItKnowledgeService;
import com.ssafy.ssafyro.api.service.itKnowledge.response.ItKnowledgeDetailResponse;
import com.ssafy.ssafyro.api.service.itKnowledge.response.ItKnowledgeListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ItKnowledgeController {

    private final ItKnowledgeService itKnowledgeService;

    @GetMapping("/api/v1/it-knowledge/{id}")
    public ApiResult<ItKnowledgeDetailResponse> getItKnowledgeDetail(@ModelAttribute ItKnowledgeDetailRequest request) {
        return success(itKnowledgeService.getItKnowledgeDetail(request.toServiceRequest()));
    }

    @GetMapping("/api/v1/it-knowledge")
    public ApiResult<ItKnowledgeListResponse> getItKnowledgeDetail(@ModelAttribute ItKnowledgeListRequest request) {
        return success(itKnowledgeService.getItKnowledgeList(request.toServiceRequest()));
    }
}
