package com.ssafy.ssafyro.domain.report;

import static com.ssafy.ssafyro.domain.report.QReport.report;
import static com.ssafy.ssafyro.domain.room.entity.QRoom.room;

import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ReportQueryRepositoryImpl implements ReportQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Report> findReports() {
        return jpaQueryFactory.select(report)
                .join(report.room, room)
                .fetchJoin()
                .from(report)
                .fetch();
    }
}
