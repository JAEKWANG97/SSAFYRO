package com.ssafy.ssafyro.api.controller.itKnowledge;

import com.ssafy.ssafyro.api.controller.itKnowledge.dto.ItKnowledgeDetailRequest;
import com.ssafy.ssafyro.api.service.itKnowledge.ItKnowledgeService;
import com.ssafy.ssafyro.api.service.itKnowledge.response.ItKnowledgeDetailResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ItKnowledgeController {

    private final ItKnowledgeService itKnowledgeService;

    @GetMapping("/api/v1/it-knowledge/{id}")
    public ItKnowledgeDetailResponse getItKnowledgeDetail(ItKnowledgeDetailRequest request) {
        return itKnowledgeService.getItKnowledgeDetail(ItKnowledgeDetailRequest.toServiceRequest(request));
    }
}
