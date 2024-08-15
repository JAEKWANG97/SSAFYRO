package com.ssafy.ssafyro.domain.interviewresult;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewResultRepository extends JpaRepository<InterviewResult, Long> {

    List<InterviewResult> findByReportId(Long reportId);

}
