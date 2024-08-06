package com.ssafy.ssafyro.api.controller.itknowledge.request;

import com.ssafy.ssafyro.api.service.itknowledge.request.ItKnowledgeListServiceRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;

public record ItKnowledgeListRequest(@PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {

    public ItKnowledgeListServiceRequest toServiceRequest() {
        return new ItKnowledgeListServiceRequest(pageable());
    }
}
