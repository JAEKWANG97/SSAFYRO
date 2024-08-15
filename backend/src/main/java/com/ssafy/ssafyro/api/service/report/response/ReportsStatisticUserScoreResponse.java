package com.ssafy.ssafyro.api.service.report.response;

import com.ssafy.ssafyro.domain.report.dto.ReportScoreDto;
import com.ssafy.ssafyro.domain.room.RoomType;
import java.util.List;

public record ReportsStatisticUserScoreResponse(RoomType roomType,
                                                List<ReportScoreInfo> scores) {

    public static ReportsStatisticUserScoreResponse of(RoomType roomType, List<ReportScoreDto> dto) {
        return new ReportsStatisticUserScoreResponse(
                roomType,
                dto.stream()
                        .map(ReportScoreInfo::new)
                        .toList()
        );
    }

    public record ReportScoreInfo(String title,
                                  int totalScore,
                                  int pronunciationScore) {

        public ReportScoreInfo(ReportScoreDto dto) {
            this(
                    dto.getTitle(),
                    dto.getTotalScore(),
                    dto.getPronunciationScore()
            );
        }
    }
}
