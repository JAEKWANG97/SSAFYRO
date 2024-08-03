package com.ssafy.ssafyro.api.service.report.response;

import com.ssafy.ssafyro.domain.report.Report;
import java.util.List;
import lombok.Data;

@Data
public class ReportCreateResponse {

    private final List<ReportInfo> reportInfos;

    public ReportCreateResponse(List<Report> reports) {
        this.reportInfos = reports.stream()
                .map(ReportInfo::new)
                .toList();
    }

    private record ReportInfo(Long userId, Long reportId) {

        public ReportInfo(Report report) {
            this(report.getUserId(), report.getId());
        }
    }
}
