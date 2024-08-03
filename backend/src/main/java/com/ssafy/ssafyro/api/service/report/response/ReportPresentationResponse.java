package com.ssafy.ssafyro.api.service.report.response;

import com.ssafy.ssafyro.api.service.article.response.ArticleResponse;
import com.ssafy.ssafyro.domain.article.Article;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResult;
import java.util.List;
import lombok.Getter;

@Getter
public class ReportPresentationResponse extends ReportResponse {

    private final ArticleResponse article;

    public ReportPresentationResponse(List<ReportDetailInfo> reportDetails, ArticleResponse article) {
        super(reportDetails);
        this.article = article;
    }

    public static ReportPresentationResponse of(List<InterviewResult> reportDetails, Article article) {
        ReportResponse reportResponse = ReportResponse.of(reportDetails);
        return new ReportPresentationResponse(reportResponse.getReportDetails(), new ArticleResponse(article));
    }

}
