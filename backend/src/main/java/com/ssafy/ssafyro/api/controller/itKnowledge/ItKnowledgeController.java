package com.ssafy.ssafyro.api.controller.itKnowledge;

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
    public ItKnowledgeDetailResponse getItKnowledgeDetail(@ModelAttribute ItKnowledgeDetailRequest request) {
        return itKnowledgeService.getItKnowledgeDetail(request.toServiceRequest());
    }

    @GetMapping("/api/v1/it-knowledge")
    public ItKnowledgeListResponse getItKnowledgeDetail(@ModelAttribute ItKnowledgeListRequest request) {
        return itKnowledgeService.getItKnowledgeList(request.toServiceRequest());
    }
}
