package com.ssafy.ssafyro.api.service.report;

import com.ssafy.ssafyro.api.service.report.response.ReportPresentationResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportsResponse;
import com.ssafy.ssafyro.domain.article.Article;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResult;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResultRepository;
import com.ssafy.ssafyro.domain.report.Report;
import com.ssafy.ssafyro.domain.report.ReportRepository;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.domain.user.UserRepository;
import com.ssafy.ssafyro.error.report.ReportNotFoundException;
import com.ssafy.ssafyro.error.user.UserNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;
    private final InterviewResultRepository interviewResultRepository;
//    private final ArticleRepository articleRepository;

    public ReportsResponse getReports(Long userId, Pageable pageable) {
        User user = getUser(userId);

        return ReportsResponse.of(
                reportRepository.findAllByUser(user, pageable).getContent()
        );
    }

    //TODO: User 검증 필요 (시큐리티 후에 작업 요망)
    public ReportResponse getReport(Long reportId) {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(ReportNotFoundException::new);

        List<InterviewResult> interviewResult = interviewResultRepository.findByReportId(reportId);

        if (report.isPresentation()) {
            //TODO: 기사 저장 완료되면 수정
            Article article = getArticle();
            return ReportPresentationResponse.of(
                    interviewResult,
                    article
            );
        }

        return ReportResponse.of(interviewResult);
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    private Article getArticle() {
        return Article.builder()
                .title("기사 제목")
                .content("기사 내용")
                .question("기사 질문")
                .build();
    }

}
