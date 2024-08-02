package com.ssafy.ssafyro.api.service.report;

import com.ssafy.ssafyro.api.service.report.response.ReportListResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportResponse;
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
import org.springframework.data.domain.Page;
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

    public ReportListResponse getReports(Long userId, Pageable pageable) {
        User user = getUser(userId);
        Page<Report> reportsWithPage = reportRepository.findAllByUser(user, pageable);

        return ReportListResponse.of(reportsWithPage.getContent());
    }

    public ReportResponse getReport(Long reportId) {
        //id를 통해 기사의 타입 확인
        reportRepository.findById(reportId)
                .orElseThrow(ReportNotFoundException::new);
        List<InterviewResult> interviewResults = interviewResultRepository.findByReportId(reportId);
        
        return null;
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }
}
