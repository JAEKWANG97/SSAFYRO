package com.ssafy.ssafyro.domain.interview;

import com.ssafy.ssafyro.api.service.ai.AIResponseGenerator;
import com.ssafy.ssafyro.api.service.report.KoMorAnGenerator;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResult;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResultDocument;
import com.ssafy.ssafyro.domain.report.Report;
import java.util.List;

public record InterviewInfos(List<InterviewRedis> interviews) {

    public int getTotalPronunciationScore() {
        return this.interviews.stream()
                .mapToInt(InterviewRedis::getPronunciationScore)
                .sum();
    }

    public List<InterviewResult> generateInterviewResults(AIResponseGenerator aiResponseGenerator,
                                                          Report report) {
        return this.interviews.stream()
                .map(interview -> InterviewResult.create(report, interview, aiResponseGenerator))
                .toList();
    }

    public List<InterviewResultDocument> generateInterviewResultDocuments(KoMorAnGenerator koMorAnGenerator) {
        return this.interviews.stream()
                .map(interviewRedis -> InterviewResultDocument.create(interviewRedis, koMorAnGenerator))
                .toList();
    }
}
