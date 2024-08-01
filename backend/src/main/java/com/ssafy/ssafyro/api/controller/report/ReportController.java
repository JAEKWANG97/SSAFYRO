package com.ssafy.ssafyro.api.controller.report;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.controller.report.dto.ReportListRequest;
import com.ssafy.ssafyro.api.service.report.ReportService;
import com.ssafy.ssafyro.api.service.report.response.ReportListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/api/v1/reports")
    public ApiResult<ReportListResponse> showReports(@ModelAttribute ReportListRequest reportListRequest,
                                                     @RequestParam(defaultValue = "1") int page,
                                                     @RequestParam(defaultValue = "10") int size) {
        return success(reportService.showReports(reportListRequest.toServiceRequest(page, size)));
    }

}
