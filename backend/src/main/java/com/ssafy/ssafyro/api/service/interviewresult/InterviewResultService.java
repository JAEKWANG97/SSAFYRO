package com.ssafy.ssafyro.api.service.interviewresult;

import com.ssafy.ssafyro.api.service.interviewresult.response.InterviewResultsResponse;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResultDocument;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResultDocumentRepository;
import com.ssafy.ssafyro.error.interviewresult.InterviewResultNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class InterviewResultService {

    private final InterviewResultDocumentRepository interviewResultDocumentRepository;

    public InterviewResultsResponse getRecommendInterviewResultsFor(Long userId, Pageable pageable) {
        List<String> tags = getWorstQuestionTagsFor(userId);

        return InterviewResultsResponse.of(
                interviewResultDocumentRepository.findBestInterviewResultsBy(tags, userId, pageable)
        );
    }

    public InterviewResultsResponse getInterviewResultsBy(Long userId, Pageable pageable) {
        return InterviewResultsResponse.of(
                interviewResultDocumentRepository.findBy(userId, pageable)
        );
    }

    public InterviewResultsResponse getBestInterviewResultsFor(String id, Pageable pageable) {
        InterviewResultDocument interviewResult = getInterviewResult(id);

        return InterviewResultsResponse.of(
                interviewResultDocumentRepository.findBestInterviewResultsBy(interviewResult.getQuestionTags(), pageable)
        );
    }

    public InterviewResultsResponse getInterviewResultsBy(List<String> tags, Pageable pageable) {
        return InterviewResultsResponse.of(
                interviewResultDocumentRepository.findBestInterviewResultsBy(tags, pageable)
        );
    }

    private List<String> getWorstQuestionTagsFor(Long userId) {
        return interviewResultDocumentRepository.findTop5ByUserIdOrderByEvaluationScore(userId).stream()
                .map(InterviewResultDocument::getQuestionTags)
                .flatMap(List::stream)
                .toList();
    }

    private InterviewResultDocument getInterviewResult(String id) {
        return interviewResultDocumentRepository.findById(id)
                .orElseThrow(() -> new InterviewResultNotFoundException("Interview result not found"));
    }
}
