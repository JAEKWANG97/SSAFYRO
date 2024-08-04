package com.ssafy.ssafyro.api.controller.report;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.controller.report.request.ReportCreateRequest;
import com.ssafy.ssafyro.api.service.report.ReportService;
import com.ssafy.ssafyro.api.service.report.response.ReportCreateResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportListResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/api/v1/reports")
    public ApiResult<ReportListResponse> showReports(@RequestParam @NotNull Long userId,
                                                     @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return success(reportService.showReports(userId, pageable));
    }

    @PostMapping("/api/v1/reports")
    public ApiResult<ReportCreateResponse> createReport(@RequestBody ReportCreateRequest request) {
        reportService.createReport(request.toServiceRequest());

        return success(new ReportCreateResponse(1L, 1L));
    }

}
