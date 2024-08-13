package com.ssafy.ssafyro.api.service.report;

import com.ssafy.ssafyro.api.service.interview.ChatGptResponseGenerator;
import com.ssafy.ssafyro.api.service.report.request.ReportCreateServiceRequest;
import com.ssafy.ssafyro.api.service.report.request.ReportsScoreServiceRequest;
import com.ssafy.ssafyro.api.service.report.response.ReportCreateResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportPresentationResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportsResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportsStatisticExpressionResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportsStatisticUserScoreResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportsStatisticUsersScoreResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportsUserAverageResponse;
import com.ssafy.ssafyro.domain.article.Article;
import com.ssafy.ssafyro.domain.article.ArticleRepository;
import com.ssafy.ssafyro.domain.interview.InterviewInfos;
import com.ssafy.ssafyro.domain.interview.InterviewRedisRepository;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResult;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResultDocumentRepository;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResultRepository;
import com.ssafy.ssafyro.domain.report.PersonalityInterviewReport;
import com.ssafy.ssafyro.domain.report.PresentationInterviewReport;
import com.ssafy.ssafyro.domain.report.Report;
import com.ssafy.ssafyro.domain.report.ReportRepository;
import com.ssafy.ssafyro.domain.room.entity.Room;
import com.ssafy.ssafyro.domain.room.entity.RoomRepository;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.domain.user.UserRepository;
import com.ssafy.ssafyro.error.article.ArticleNotFoundException;
import com.ssafy.ssafyro.error.interviewresult.InterviewResultNotFoundException;
import com.ssafy.ssafyro.error.report.ReportNotFoundException;
import com.ssafy.ssafyro.error.room.RoomNotFoundException;
import com.ssafy.ssafyro.error.user.UserNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class ReportService {

    private final KoMorAnGenerator koMorAnGenerator;
    private final ChatGptResponseGenerator chatGptResponseGenerator;

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final ReportRepository reportRepository;
    private final ArticleRepository articleRepository;
    private final InterviewResultRepository interviewResultRepository;

    private final InterviewRedisRepository interviewRedisRepository;
    private final InterviewResultDocumentRepository interviewResultDocumentRepository;

    public ReportsResponse getReports(Long userId, Pageable pageable) {
        User user = getUser(userId);

        return ReportsResponse.of(
                reportRepository.findAllByUser(user, pageable).getContent()
        );
    }

    public ReportResponse getReport(Long reportId) {
        Report report = getReportBy(reportId);

        List<InterviewResult> interviewResult = interviewResultRepository.findByReportId(reportId);
        validInterviewResult(interviewResult);

        //TODO: 형변환 리펙토링 고려하기
        if (report.isPresentation()) {
            Article article = ((PresentationInterviewReport) report).getArticle();

            return ReportPresentationResponse.of(
                    interviewResult,
                    article
            );
        }

        return ReportResponse.of(interviewResult);
    }

    @Transactional
    public ReportCreateResponse createReport(ReportCreateServiceRequest request) {
        InterviewInfos interviewInfos = interviewRedisRepository.findBy(request.userId());

        Report report = createReportBy(request, interviewInfos);
        reportRepository.save(report);

        interviewResultRepository.saveAll(
                interviewInfos.generateInterviewResults(chatGptResponseGenerator, report)
        );

        interviewResultDocumentRepository.saveAll(
                interviewInfos.generateInterviewResultDocuments(koMorAnGenerator)
        );

        return ReportCreateResponse.of(report);
    }

    public ReportsUserAverageResponse getReportsUserAverage(Long userId, ReportsScoreServiceRequest request) {
        return reportRepository.findTotalAvgBy(request.roomType(), getUser(userId))
                .orElseThrow(() -> new ReportNotFoundException("Report not found"))
                .toResponse(request.roomType());
    }

    public ReportsStatisticUsersScoreResponse getReportsStatisticUsersScore(ReportsScoreServiceRequest request) {
        return reportRepository.findAllAvgScoreBy(request.roomType())
                .orElseThrow(() -> new ReportNotFoundException("Report not found"))
                .toResponse(request.roomType());
    }

    public ReportsStatisticUserScoreResponse getReportsStatisticUserScore(Long userId,
                                                                          ReportsScoreServiceRequest request) {
        return ReportsStatisticUserScoreResponse.of(
                request.roomType(),
                reportRepository.findScoreBy(request.roomType(), getUser(userId))
        );
    }

    public ReportsStatisticExpressionResponse getReportsStatisticExpression(Long userId,
                                                                            ReportsScoreServiceRequest request) {
        return null;
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    private Room getRoom(String roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(() -> new RoomNotFoundException("Room not found"));
    }

    private Report createReportBy(ReportCreateServiceRequest request, InterviewInfos interviewInfos) {
        Room room = getRoom(request.roomId());
        User user = getUser(request.userId());

        if (room.isPresentation()) {
            return PresentationInterviewReport.builder()
                    .room(room)
                    .user(user)
                    .totalScore(request.totalScore())
                    .pronunciationScore(interviewInfos.getTotalPronunciationScore())
                    .article(getArticle(request.articleId()))
                    .build();
        }

        return PersonalityInterviewReport.builder()
                .room(room)
                .user(user)
                .totalScore(request.totalScore())
                .pronunciationScore(interviewInfos.getTotalPronunciationScore())
                .build();
    }

    private Report getReportBy(Long reportId) {
        return reportRepository.findById(reportId)
                .orElseThrow(() -> new ReportNotFoundException("Report not found"));
    }

    private Article getArticle(Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new ArticleNotFoundException("Article not found"));
    }

    private static void validInterviewResult(List<InterviewResult> interviewResult) {
        if (interviewResult.isEmpty()) {
            throw new InterviewResultNotFoundException("InterviewResult not found");
        }
    }
}
