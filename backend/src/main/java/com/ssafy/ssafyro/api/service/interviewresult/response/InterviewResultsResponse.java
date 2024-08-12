package com.ssafy.ssafyro.api.service.interviewresult.response;

import com.ssafy.ssafyro.api.service.report.Expression;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResultDocument;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import lombok.Getter;

@Getter
public class InterviewResultsResponse {

    private final List<InterviewResultInfo> interviewResultInfos;

    private InterviewResultsResponse(List<InterviewResultDocument> interviewResults) {
        this.interviewResultInfos = interviewResults.stream()
                .map(InterviewResultInfo::new)
                .toList();
    }

    public static InterviewResultsResponse of(List<InterviewResultDocument> interviewResults) {
        return new InterviewResultsResponse(interviewResults);
    }

    private record InterviewResultInfo(String interviewResultId,
                                       String question,
                                       String answer,
                                       Map<Expression, Double> expressions,
                                       LocalDateTime createdDate) {

        public InterviewResultInfo(InterviewResultDocument interviewResultDocument) {
            this(
                    interviewResultDocument.getId(),
                    interviewResultDocument.getQuestion(),
                    interviewResultDocument.getAnswer(),
                    interviewResultDocument.getTop3Expression(),
                    interviewResultDocument.getCreatedDate()
            );
        }
    }
}
