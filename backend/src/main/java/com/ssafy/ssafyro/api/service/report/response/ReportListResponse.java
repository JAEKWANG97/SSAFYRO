package com.ssafy.ssafyro.api.service.report.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record ReportListResponse(String title,
                                 String type,
                                 int totalScore,
                                 int pronunciationScore,
                                 @JsonFormat(pattern = "yyyy.MM.dd") LocalDateTime createdAt) {
}
