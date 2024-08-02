package com.ssafy.ssafyro.api.service.report.response;

import com.ssafy.ssafyro.api.service.report.Expression;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResult;
import java.util.List;
import java.util.Map;

public record ReportResponse(List<ReportDetailInfo> reportDetails) {

    public static ReportResponse of(List<InterviewResult> reportDetails,
                                    Map<Expression, Double> expression) {
        return new ReportResponse(
                reportDetails.stream()
                        .map(interviewResult -> new ReportDetailInfo(interviewResult, expression))
                        .toList()
        );
    }

    public record ReportDetailInfo(String question,
                                   String answer,
                                   String feedback,
                                   int pronunciationScore,
                                   Map<Expression, Double> expression) {
        //Map key는 enum 으로 해보자
        private ReportDetailInfo(InterviewResult interviewResult,
                                 Map<Expression, Double> expression) {
            this(
                    interviewResult.getQuestion(),
                    interviewResult.getAnswer(),
                    interviewResult.getFeedback(),
                    interviewResult.getPronunciationScore(),
                    expression
            );
        }
    }

}
