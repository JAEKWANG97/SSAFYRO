package com.ssafy.ssafyro.api.service.report.request;

import lombok.Builder;
import org.springframework.data.domain.Pageable;

@Builder
public record ReportListServiceRequest(Long userId,
                                       Pageable pageable) {
}
