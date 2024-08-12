package com.ssafy.ssafyro.domain.interviewresult;

import java.util.List;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface InterviewResultDocumentRepository extends ElasticsearchRepository<InterviewResultDocument, Long>,
        InterviewResultDocumentOperationRepository {

    List<InterviewResultDocument> findTop5ByUserIdOrderByEvaluationScore(Long userId);
}
