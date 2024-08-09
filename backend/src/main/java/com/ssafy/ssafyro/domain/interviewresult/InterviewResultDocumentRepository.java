package com.ssafy.ssafyro.domain.interviewresult;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface InterviewResultDocumentRepository extends ElasticsearchRepository<InterviewResultDocument, Long>,
        InterviewResultDocumentOperationRepository {
}
