package com.ssafy.ssafyro.domain.interview;

import com.ssafy.ssafyro.api.service.interview.ChatGptResponseGenerator;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResult;
import com.ssafy.ssafyro.domain.report.Report;
import java.util.List;

public record InterviewInfos(List<InterviewRedis> interviews) {

    public int getTotalPronunciationScore() {
        return this.interviews.stream()
                .mapToInt(InterviewRedis::getPronunciationScore)
                .sum();
    }

    public List<InterviewResult> generateInterviewResults(ChatGptResponseGenerator chatGptResponseGenerator,
                                                          Report report) {
        return this.interviews.stream()
                .map(interview -> InterviewResult.create(report, interview, chatGptResponseGenerator))
                .toList();
    }
}
