package com.ssafy.ssafyro.domain.report;

import static com.ssafy.ssafyro.domain.interviewresult.QInterviewResult.interviewResult;
import static com.ssafy.ssafyro.domain.report.QReport.report;
import static com.ssafy.ssafyro.domain.room.entity.QRoom.room;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.ssafyro.api.service.report.dto.QReportScoreAverageDto;
import com.ssafy.ssafyro.api.service.report.dto.ReportScoreAverageDto;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.error.report.ReportNotFoundException;
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

    @Override
    public ReportScoreAverageDto findTotalAvgBy(RoomType type, User user) {
        ReportScoreAverageDto result = jpaQueryFactory
                .select(
                        new QReportScoreAverageDto(
                                report.totalScore.avg(),
                                report.pronunciationScore.avg(),
                                interviewResult.happy.avg(),
                                interviewResult.disgust.avg(),
                                interviewResult.sad.avg(),
                                interviewResult.surprise.avg(),
                                interviewResult.fear.avg(),
                                interviewResult.angry.avg(),
                                interviewResult.neutral.avg()
                        )
                )
                .from(interviewResult)
                .join(interviewResult.report, report)
                .join(report.room, room)
                .where(
                        report.user.eq(user)
                                .and(room.type.eq(type))
                )
                .groupBy(report.user)
                .fetchOne();

        if (result == null) {
            throw new ReportNotFoundException("Report not found");
        }

        return result;
    }
}
