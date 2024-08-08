package com.ssafy.ssafyro.api.service.interviewresult;

import com.ssafy.ssafyro.api.service.interviewresult.response.InterviewResultsResponse;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResultDocumentRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class InterviewResultService {

    private final InterviewResultDocumentRepository interviewResultDocumentRepository;

    public InterviewResultsResponse getInterviewResultsBy(List<String> tags) {
        return InterviewResultsResponse.of(interviewResultDocumentRepository.findBy(tags));
    }
}
