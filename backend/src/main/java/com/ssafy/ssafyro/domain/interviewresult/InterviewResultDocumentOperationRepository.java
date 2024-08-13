package com.ssafy.ssafyro.domain.interviewresult;

import java.util.List;
import org.springframework.data.domain.Pageable;

public interface InterviewResultDocumentOperationRepository {

    List<InterviewResultDocument> findBy(Long userId, Pageable pageable);

    List<InterviewResultDocument> findBestInterviewResultsBy(List<String> tags, Long userId, Pageable pageable);

    List<InterviewResultDocument> findBestInterviewResultsBy(List<String> tags, Pageable pageable);
}
