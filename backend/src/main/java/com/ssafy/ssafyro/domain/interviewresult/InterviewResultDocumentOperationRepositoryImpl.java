package com.ssafy.ssafyro.domain.interviewresult;

import static org.springframework.data.domain.Pageable.ofSize;
import static org.springframework.data.domain.Sort.Direction.ASC;
import static org.springframework.data.domain.Sort.Direction.DESC;
import static org.springframework.data.elasticsearch.core.query.Criteria.where;

import java.util.List;
import lombok.RequiredArgsConstructor;
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
    public List<InterviewResultDocument> findBy(Long userId) {
        Query query = new CriteriaQuery(whereUserIdIs(userId))
                .addSort(sortByEvaluationScoreAsc())
                .setPageable(ofSize(5));

        return elasticsearchOperations.search(query, InterviewResultDocument.class).stream()
                .map(SearchHit::getContent)
                .toList();
    }

    @Override
    public List<InterviewResultDocument> findBy(List<String> tags) {
        Query query = new CriteriaQuery(whereQuestionTagsIn(tags))
                .addSort(sortByEvaluationScoreDesc())
                .setPageable(ofSize(5));

        return elasticsearchOperations.search(query, InterviewResultDocument.class).stream()
                .map(SearchHit::getContent)
                .toList();
    }

    private Criteria whereUserIdIs(Long userId) {
        return where("userId").is(userId);
    }

    private Criteria whereQuestionTagsIn(List<String> tags) {
        return where("questionTags").in(tags);
    }

    private Sort sortByEvaluationScoreAsc() {
        return Sort.by(ASC, "evaluationScore");
    }

    private Sort sortByEvaluationScoreDesc() {
        return Sort.by(DESC, "evaluationScore");
    }
}
