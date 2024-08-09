package com.ssafy.ssafyro.api.service.interviewresult.response;

import com.ssafy.ssafyro.domain.interviewresult.InterviewResultDocument;
import java.util.List;
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

    private record InterviewResultInfo(String question,
                                       String answer) {

        public InterviewResultInfo(InterviewResultDocument interviewResultDocument) {
            this(
                    interviewResultDocument.getQuestion(),
                    interviewResultDocument.getAnswer()
            );
        }
    }
}
