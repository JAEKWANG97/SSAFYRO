package com.ssafy.ssafyro.api.service.itKnowledge;

import com.ssafy.ssafyro.api.service.itKnowledge.request.ItKnowledgeDetailServiceRequest;
import com.ssafy.ssafyro.api.service.itKnowledge.request.ItKnowledgeListServiceRequest;
import com.ssafy.ssafyro.api.service.itKnowledge.response.ItKnowledgeDetailResponse;
import com.ssafy.ssafyro.api.service.itKnowledge.response.ItKnowledgeListResponse;
import com.ssafy.ssafyro.domain.itknowledge.ItKnowledge;
import com.ssafy.ssafyro.domain.itknowledge.ItKnowledgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ItKnowledgeService {

    private final ItKnowledgeRepository itKnowledgeRepository;

    public ItKnowledgeDetailResponse getItKnowledgeDetail(ItKnowledgeDetailServiceRequest request) {
        ItKnowledge itKnowledge = getItKnowledge(request);

        return ItKnowledgeDetailResponse.of(itKnowledge);
    }

    public ItKnowledgeListResponse getItKnowledgeList(ItKnowledgeListServiceRequest request) {
        Page<ItKnowledge> itKnowlegeList = itKnowledgeRepository.findAll(request.pageable());

        return ItKnowledgeListResponse.of(itKnowlegeList);
    }

    private ItKnowledge getItKnowledge(ItKnowledgeDetailServiceRequest request) {
        return itKnowledgeRepository.findById(request.id())
                .orElseThrow(() -> new IllegalArgumentException("해당 아이디의 IT 지식이 존재하지 않습니다."));
    }
}
