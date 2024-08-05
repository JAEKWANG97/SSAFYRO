package com.ssafy.ssafyro.domain.report;

import com.ssafy.ssafyro.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {

    Page<Report> findAllByUser(User user, Pageable pageable);

}
