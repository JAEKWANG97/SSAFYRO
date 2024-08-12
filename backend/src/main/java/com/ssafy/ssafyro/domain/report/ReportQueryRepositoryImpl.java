package com.ssafy.ssafyro.domain.report;

import static com.ssafy.ssafyro.domain.report.QReport.report;
import static com.ssafy.ssafyro.domain.room.entity.QRoom.room;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.user.User;
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

    @Override
    public int countReportsType(RoomType type, User user) {
        return jpaQueryFactory.select(report)
                .from(report)
                .join(report.room, room)
                .fetchJoin()
                .where(report.user.eq(user)
                        .and(room.type.eq(type)))
                .fetch()
                .size();
    }
}
