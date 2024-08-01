package com.ssafy.ssafyro.api.service.report.request;

import lombok.Builder;

@Builder
public record ReportListServiceRequest(String roomId,
                                       Long userId,
                                       int page,
                                       int size) {
}
