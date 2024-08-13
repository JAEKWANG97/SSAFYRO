package com.ssafy.ssafyro.domain.report;

import static com.ssafy.ssafyro.domain.interviewresult.QInterviewResult.interviewResult;
import static com.ssafy.ssafyro.domain.report.QReport.report;
import static com.ssafy.ssafyro.domain.room.entity.QRoom.room;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.ssafyro.domain.report.dto.QReportAllScoreDto;
import com.ssafy.ssafyro.domain.report.dto.QReportExpressionDto;
import com.ssafy.ssafyro.domain.report.dto.QReportScoreAverageDto;
import com.ssafy.ssafyro.domain.report.dto.QReportScoreDto;
import com.ssafy.ssafyro.domain.report.dto.ReportAllScoreDto;
import com.ssafy.ssafyro.domain.report.dto.ReportExpressionDto;
import com.ssafy.ssafyro.domain.report.dto.ReportScoreAverageDto;
import com.ssafy.ssafyro.domain.report.dto.ReportScoreDto;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.user.User;
import java.util.List;
import java.util.Optional;
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
    public Optional<ReportScoreAverageDto> findTotalAvgBy(RoomType type, User user) {
        return Optional.ofNullable(
                jpaQueryFactory
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
                        .fetchOne()
        );
    }

    @Override
    public Optional<ReportAllScoreDto> findAllAvgScoreBy(RoomType type) {
        return Optional.ofNullable(
                jpaQueryFactory
                        .select(
                                new QReportAllScoreDto(
                                        report.room.title,
                                        report.totalScore.avg(),
                                        report.pronunciationScore.avg()
                                )
                        )
                        .from(report)
                        .join(report.room, room)
                        .where(
                                room.type.eq(type)
                        )
                        .fetchOne()
        );
    }

    @Override
    public List<ReportScoreDto> findScoreBy(RoomType type, User user) {
        return jpaQueryFactory
                .select(
                        new QReportScoreDto(
                                report.totalScore,
                                report.pronunciationScore
                        )
                )
                .from(report)
                .join(report.room, room)
                .where(
                        report.user.eq(user)
                                .and(room.type.eq(type))
                )
                .fetch();
    }

    @Override
    public Optional<ReportExpressionDto> findAvgExpressionBy(RoomType type, User user) {
        return Optional.ofNullable(
                jpaQueryFactory
                        .select(
                                new QReportExpressionDto(
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
                        .fetchOne()
        );
    }

}
