package com.ssafy.ssafyro.api.service.report.response;

import com.ssafy.ssafyro.domain.report.Report;
import com.ssafy.ssafyro.domain.room.RoomType;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;

public record ReportListResponse(List<ReportInfo> reports) {

    public static ReportListResponse of(List<Report> reportList) {
        return new ReportListResponse(
                reportList.stream()
                        .map(ReportInfo::new)
                        .toList()
        );
    }

    @Builder
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
