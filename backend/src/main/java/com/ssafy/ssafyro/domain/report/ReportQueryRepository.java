package com.ssafy.ssafyro.domain.report;

import java.util.List;

public interface ReportQueryRepository {

    List<Report> findReports();
}
