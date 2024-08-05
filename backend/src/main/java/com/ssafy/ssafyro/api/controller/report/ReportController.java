package com.ssafy.ssafyro.api.controller.report;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.controller.report.request.ReportCreateRequest;
import com.ssafy.ssafyro.api.service.report.ReportService;
import com.ssafy.ssafyro.api.service.report.response.ReportCreateResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportsResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
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

}
