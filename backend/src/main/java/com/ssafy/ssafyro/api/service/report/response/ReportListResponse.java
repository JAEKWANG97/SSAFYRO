package com.ssafy.ssafyro.api.service.report.response;

import com.ssafy.ssafyro.domain.report.Report;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.entity.Room;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;

public record ReportListResponse(List<ReportInfo> reports) {

    public static ReportListResponse of(List<Report> reportList) {
        return new ReportListResponse(
                reportList.stream()
                        .map(ReportInfo::entityToReportInfo)
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

        private static ReportInfo entityToReportInfo(Report report) {
            Room room = report.getRoom();
            return ReportInfo.builder()
                    .reportId(report.getId())
                    .title(room.getTitle())
                    .type(room.getType())
                    .totalScore(report.getTotalScore())
                    .pronunciationScore(report.getPronunciationScore())
                    .createdDate(room.getCreatedDate())
                    .build();
        }

    }

}
