package com.ssafy.ssafyro.domain.interviewresult;

import static org.springframework.data.elasticsearch.core.query.Criteria.where;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class InterviewResultDocumentOperationRepositoryImpl implements InterviewResultDocumentOperationRepository {

    private final ElasticsearchOperations elasticsearchOperations;

    @Override
    public List<InterviewResultDocument> findBy(Long userId) {
        Query query = new CriteriaQuery(
                where("userId").is(userId)
        );

        return elasticsearchOperations.search(query, InterviewResultDocument.class).stream()
                .map(SearchHit::getContent)
                .toList();
    }

    @Override
    public List<InterviewResultDocument> findBy(List<String> tags) {
        Query query = new CriteriaQuery(
                where("questionTags").in(tags)
        );

        return elasticsearchOperations.search(query, InterviewResultDocument.class).stream()
                .map(SearchHit::getContent)
                .toList();
    }
}
