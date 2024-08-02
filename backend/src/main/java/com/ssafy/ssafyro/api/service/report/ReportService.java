package com.ssafy.ssafyro.api.service.report;

import com.ssafy.ssafyro.api.service.report.response.ReportListResponse;
import com.ssafy.ssafyro.domain.report.Report;
import com.ssafy.ssafyro.domain.report.ReportRepository;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.domain.user.UserRepository;
import com.ssafy.ssafyro.error.user.UserNotFoundException;
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

    public ReportListResponse showReports(Long userId, Pageable pageable) {
        User user = getUser(userId);
        Page<Report> reportsWithPage = reportRepository.findAllByUser(user, pageable);

        return ReportListResponse.of(reportsWithPage.getContent());
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }
}
