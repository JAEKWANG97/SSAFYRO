package com.ssafy.ssafyro.domain.interviewresult;

import java.util.List;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@EnableElasticsearchRepositories
public interface InterviewResultDocumentOperationRepository {

    List<InterviewResultDocument> findBy(Long userId);

    List<InterviewResultDocument> findBestInterviewResultBy(List<String> tags, Long userId);
}
