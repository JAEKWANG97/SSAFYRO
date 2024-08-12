package com.ssafy.ssafyro.domain.interviewresult;

import static org.springframework.data.domain.Sort.Direction.DESC;
import static org.springframework.data.elasticsearch.core.query.Criteria.where;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class InterviewResultDocumentOperationRepositoryImpl implements InterviewResultDocumentOperationRepository {

    private final ElasticsearchOperations elasticsearchOperations;

    @Override
    public List<InterviewResultDocument> findBy(Long userId, Pageable pageable) {
        Query query = new CriteriaQuery(whereUserIdIs(userId))
                .setPageable(pageable);

        return elasticsearchOperations.search(query, InterviewResultDocument.class).stream()
                .map(SearchHit::getContent)
                .toList();
    }

    @Override
    public List<InterviewResultDocument> findBestInterviewResultsBy(List<String> tags, Long userId, Pageable pageable) {
        Query query = new CriteriaQuery(whereQuestionTagsInAndUserIdIsNot(tags, userId))
                .addSort(Sort.by(DESC, "_score"))
                .setPageable(pageable);

        return elasticsearchOperations.search(query, InterviewResultDocument.class).stream()
                .map(SearchHit::getContent)
                .toList();
    }

    @Override
    public List<InterviewResultDocument> findInterviewResultsBy(List<String> tags, Pageable pageable) {
        Query query = new CriteriaQuery(whereQuestionTagsIn(tags))
                .addSort(Sort.by(DESC, "_score"))
                .setPageable(pageable);

        return elasticsearchOperations.search(query, InterviewResultDocument.class).stream()
                .map(SearchHit::getContent)
                .toList();
    }

    private Criteria whereUserIdIs(Long userId) {
        return where("userId").is(userId);
    }

    private Criteria whereQuestionTagsInAndUserIdIsNot(List<String> tags, Long userId) {
        return whereQuestionTagsIn(tags).and(whereUserIdIsNot(userId));
    }

    private Criteria whereUserIdIsNot(Long userId) {
        return where("userId").not().is(userId);
    }

    private Criteria whereQuestionTagsIn(List<String> tags) {
        return where("questionTags").in(tags);
    }
}
