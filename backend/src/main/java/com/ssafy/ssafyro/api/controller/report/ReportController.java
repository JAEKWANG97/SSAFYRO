package com.ssafy.ssafyro.api.controller.report;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.controller.report.request.ReportCreateRequest;
import com.ssafy.ssafyro.api.controller.report.request.ReportsScoreRequest;
import com.ssafy.ssafyro.api.service.report.ReportService;
import com.ssafy.ssafyro.api.service.report.response.ReportCreateResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportsResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportsStatisticUsersScoreResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportsUserAverageResponse;
import com.ssafy.ssafyro.security.JwtAuthentication;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/api/v1/reports")
    public ApiResult<ReportsResponse> getReports(@RequestParam @NotNull Long userId,
                                                 @PageableDefault(page = 1) Pageable pageable) {
        return success(reportService.getReports(userId, pageable));
    }

    @GetMapping("/api/v1/report/{id}")
    public ApiResult<ReportResponse> getReport(@PathVariable("id") @NotNull Long reportId) {
        return success(reportService.getReport(reportId));
    }

    @PostMapping("/api/v1/reports")
    public ApiResult<ReportCreateResponse> createReport(@RequestBody ReportCreateRequest request) {
        return success(reportService.createReport(request.toServiceRequest()));
    }

    @GetMapping("/api/v1/reports/score-average")
    public ApiResult<ReportsUserAverageResponse> getReportsUserAverage(
            @AuthenticationPrincipal JwtAuthentication userInfo,
            @Valid @ModelAttribute ReportsScoreRequest request) {
        return success(reportService.getReportsUserAverage(userInfo.id(), request.toServiceRequest()));
    }

    @GetMapping("/api/v1/reports/statistics-all-score")
    public ApiResult<ReportsStatisticUsersScoreResponse> getReportsStatisticUsersScore(
            @Valid @ModelAttribute ReportsScoreRequest request) {
        return success(reportService.getReportsStatisticUsersScore(request.toServiceRequest()));
    }
}
