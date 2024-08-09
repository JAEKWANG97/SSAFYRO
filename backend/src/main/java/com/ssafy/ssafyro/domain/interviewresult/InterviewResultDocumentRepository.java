package com.ssafy.ssafyro.domain.interviewresult;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@EnableElasticsearchRepositories
public interface InterviewResultDocumentRepository extends ElasticsearchRepository<InterviewResultDocument, Long>,
        InterviewResultDocumentOperationRepository {
}
