package com.ssafy.ssafyro.api.service.report;

import static com.ssafy.ssafyro.domain.room.RoomType.PRESENTATION;

import com.ssafy.ssafyro.api.service.interview.ChatGptResponseGenerator;
import com.ssafy.ssafyro.api.service.report.request.ReportCreateServiceRequest;
import com.ssafy.ssafyro.api.service.report.response.ReportCreateResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportListResponse;
import com.ssafy.ssafyro.domain.article.Article;
import com.ssafy.ssafyro.domain.article.ArticleRepository;
import com.ssafy.ssafyro.domain.interview.InterviewInfos;
import com.ssafy.ssafyro.domain.interview.InterviewRedisRepository;
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
import com.ssafy.ssafyro.error.room.RoomNotFoundException;
import com.ssafy.ssafyro.error.user.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class ReportService {

    private final ChatGptResponseGenerator chatGptResponseGenerator;

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final ReportRepository reportRepository;
    private final ArticleRepository articleRepository;
    private final InterviewResultRepository interviewResultRepository;

    private final InterviewRedisRepository interviewRedisRepository;

    public ReportListResponse showReports(Long userId, Pageable pageable) {
        User user = getUser(userId);
        Page<Report> reportsWithPage = reportRepository.findAllByUser(user, pageable);

        return ReportListResponse.of(reportsWithPage.getContent());
    }

    @Transactional
    public ReportCreateResponse createReport(ReportCreateServiceRequest request) {
        InterviewInfos interviewInfos = interviewRedisRepository.findBy(request.userId());

        Report report = createReportBy(request, interviewInfos);
        reportRepository.save(report);

        interviewResultRepository.saveAll(
                interviewInfos.generateInterviewResults(chatGptResponseGenerator, report)
        );

        return ReportCreateResponse.of(report);
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

        if (PRESENTATION.equals(room.getType())) {
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

    private Article getArticle(Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new ArticleNotFoundException("Article not found"));
    }
}
