package com.ssafy.ssafyro.api.service.report.response;

import com.ssafy.ssafyro.domain.report.Report;
import com.ssafy.ssafyro.domain.room.RoomType;
import java.time.LocalDateTime;
import java.util.List;

public record ReportsResponse(List<ReportInfo> reports) {

    public static ReportsResponse of(List<Report> reportList) {
        return new ReportsResponse(
                reportList.stream()
                        .map(ReportInfo::new)
                        .toList()
        );
    }

    private record ReportInfo(Long reportId,
                              String title,
                              RoomType type,
                              int totalScore,
                              int pronunciationScore,
                              LocalDateTime createdDate) {

        private ReportInfo(Report report) {
            this(
                    report.getId(),
                    report.getRoom().getTitle(),
                    report.getRoom().getType(),
                    report.getTotalScore(),
                    report.getPronunciationScore(),
                    report.getRoom().getCreatedDate()
            );
        }

    }

}
