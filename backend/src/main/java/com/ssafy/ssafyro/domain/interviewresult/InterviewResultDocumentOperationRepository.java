package com.ssafy.ssafyro.domain.interviewresult;

import java.util.List;

public interface InterviewResultDocumentOperationRepository {

    List<InterviewResultDocument> findBy(Long userId);

    List<InterviewResultDocument> findBy(List<String> tags);
}
