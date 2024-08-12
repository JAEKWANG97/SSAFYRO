package com.ssafy.ssafyro.api.service.report;

import static com.ssafy.ssafyro.domain.room.RoomType.PERSONALITY;
import static com.ssafy.ssafyro.domain.room.RoomType.PRESENTATION;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.BDDAssertions.tuple;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.api.service.interview.ChatGptResponseGenerator;
import com.ssafy.ssafyro.api.service.report.request.ReportCreateServiceRequest;
import com.ssafy.ssafyro.api.service.report.response.ReportCreateResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportPresentationResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportsResponse;
import com.ssafy.ssafyro.domain.MajorType;
import com.ssafy.ssafyro.domain.article.Article;
import com.ssafy.ssafyro.domain.article.ArticleRepository;
import com.ssafy.ssafyro.domain.interview.InterviewRedis;
import com.ssafy.ssafyro.domain.interview.InterviewRedisRepository;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResult;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResultDocumentRepository;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResultRepository;
import com.ssafy.ssafyro.domain.report.PersonalityInterviewReport;
import com.ssafy.ssafyro.domain.report.PresentationInterviewReport;
import com.ssafy.ssafyro.domain.report.Report;
import com.ssafy.ssafyro.domain.report.ReportRepository;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.entity.Room;
import com.ssafy.ssafyro.domain.room.entity.RoomRepository;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.domain.user.UserRepository;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Pageable;

class ReportServiceTest extends IntegrationTestSupport {

    @MockBean
    private ChatGptResponseGenerator chatGptResponseGenerator;

    @Autowired
    private ReportService reportService;

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private InterviewResultRepository interviewResultRepository;

    @Autowired
    private InterviewRedisRepository interviewRedisRepository;

    @Autowired
    private InterviewResultDocumentRepository interviewResultDocumentRepository;

    @AfterEach
    void tearDown() {
        interviewResultRepository.deleteAllInBatch();
        reportRepository.deleteAllInBatch();
        roomRepository.deleteAllInBatch();
        userRepository.deleteAllInBatch();
        articleRepository.deleteAllInBatch();
        interviewRedisRepository.deleteAll();
        interviewResultDocumentRepository.deleteAll();
    }

    @DisplayName("유저와 페이지의 정보를 통해 면접 레포트를 조회한다.")
    @Test
    void getReports() {
        // given
        User user = createUser();
        userRepository.save(user);

        Room room1 = createRoom(PERSONALITY, 1);
        Room room2 = createRoom(PERSONALITY, 2);
        Room room3 = createRoom(PERSONALITY, 3);
        roomRepository.saveAll(
                List.of(room1, room2, room3));

        List<Report> reports = List.of(
                createReportPersonal(user, 90, room1),
                createReportPersonal(user, 92, room2),
                createReportPersonal(user, 95, room3));
        reportRepository.saveAll(reports);

        // when
        ReportsResponse response = reportService.getReports(user.getId(), Pageable.unpaged());

        // then
        assertThat(response.reports()).hasSize(3)
                .extracting("totalScore", "pronunciationScore")
                .containsExactlyInAnyOrder(
                        tuple(reports.get(0).getTotalScore(), reports.get(0).getPronunciationScore()),
                        tuple(reports.get(1).getTotalScore(), reports.get(1).getPronunciationScore()),
                        tuple(reports.get(2).getTotalScore(), reports.get(2).getPronunciationScore()));
    }

    @DisplayName("인성면접 레포트 상세내용을 조회한다. 상세내용은 각 질문과 답변 및 피드백이 있다.")
    @Test
    void getReportPersonal() {
        // given
        User user = createUser();
        userRepository.save(user);

        Room room = createRoom(PERSONALITY, 1);
        roomRepository.save(room);

        Report report = createReportPersonal(user, 90, room);
        reportRepository.save(report);

        InterviewResult interviewResult1 = createInterviewResult(user, report, 1);
        InterviewResult interviewResult2 = createInterviewResult(user, report, 2);
        InterviewResult interviewResult3 = createInterviewResult(user, report, 3);
        interviewResultRepository.saveAll(
                List.of(interviewResult1, interviewResult2, interviewResult3));

        // when
        ReportResponse response = reportService.getReport(report.getId());

        // then
        assertThat(response.getQnaCount()).isEqualTo(3);
        assertThat(response.getReportDetails()).hasSize(3)
                .extracting("question")
                .containsExactlyInAnyOrder(
                        interviewResult1.getQuestion(),
                        interviewResult2.getQuestion(),
                        interviewResult3.getQuestion());
    }

    @DisplayName("PT 면접 레포트 상세내용을 조회한다. 상세내용은 각 질문과 답변 및 피드백이 있다.")
    @Test
    void getReportPresentation() {
        // given
        User user = createUser();
        userRepository.save(user);

        Room room = createRoom(PRESENTATION, 1);
        roomRepository.save(room);

        Article article = createArticle();
        articleRepository.save(article);

        Report report = createReportPresentation(user, 90, room, article);
        reportRepository.save(report);

        InterviewResult interviewResult1 = createInterviewResult(user, report, 1);
        InterviewResult interviewResult2 = createInterviewResult(user, report, 2);
        InterviewResult interviewResult3 = createInterviewResult(user, report, 3);
        interviewResultRepository.saveAll(
                List.of(interviewResult1, interviewResult2, interviewResult3));

        // when
        ReportPresentationResponse response = (ReportPresentationResponse) reportService.getReport(report.getId());

        // then
        assertThat(response.getQnaCount()).isEqualTo(3);
        assertThat(response.getArticle()).isNotNull()
                .extracting("title", "content")
                .containsExactlyInAnyOrder(
                        article.getTitle(), article.getContent());

        assertThat(response.getReportDetails()).hasSize(3)
                .extracting("question")
                .containsExactlyInAnyOrder(
                        interviewResult1.getQuestion(),
                        interviewResult2.getQuestion(),
                        interviewResult3.getQuestion());
    }

    @DisplayName("면접을 종료하고 면접 내용에 대한 레포트를 작성한다.")
    @Test
    void createReport() {
        // given
        User user = createUser();
        userRepository.save(user);

        Room room = createRoom(PRESENTATION, 1);
        roomRepository.save(room);

        Article article = createArticle();
        articleRepository.save(article);

        InterviewRedis interviewRedis1 = createInterview(user.getId(), 1);
        interviewRedisRepository.save(interviewRedis1);

        InterviewRedis interviewRedis2 = createInterview(user.getId(), 2);
        interviewRedisRepository.save(interviewRedis2);

        ReportCreateServiceRequest request = new ReportCreateServiceRequest(
                room.getId(), article.getId(), user.getId(), 100);

        given(chatGptResponseGenerator.generateFeedbackBy(any(String.class), any(String.class)))
                .willReturn("피드백");

        // when
        ReportCreateResponse response = reportService.createReport(request);
        Report report = reportRepository.findById(response.reportId()).get();

        // then
        assertThat(response).isNotNull()
                .extracting("userId", "reportId")
                .containsExactly(user.getId(), report.getId());

        assertThat(interviewResultDocumentRepository.findTop5ByUserIdOrderByEvaluationScore(user.getId())).isNotNull()
                .extracting("userId", "question", "answer")
                .containsExactlyInAnyOrder(
                        tuple(user.getId(), "질문1", "답변1"),
                        tuple(user.getId(), "질문2", "답변2"));
    }

    private User createUser() {
        return User.builder()
                .username("enduf768640@gmail.com")
                .nickname("ssafyRo")
                .providerId("providerId")
                .profileImageUrl("www.image.url")
                .majorType(MajorType.MAJOR)
                .build();
    }

    private Report createReportPersonal(User user, int totalScore, Room room) {
        return PersonalityInterviewReport.builder()
                .user(user)
                .room(room)
                .totalScore(totalScore)
                .pronunciationScore(3)
                .build();
    }

    private Report createReportPresentation(User user, int totalScore, Room room, Article article) {
        return PresentationInterviewReport.builder()
                .user(user)
                .room(room)
                .totalScore(totalScore)
                .pronunciationScore(3)
                .article(article)
                .build();
    }

    private Article createArticle() {
        return Article.builder()
                .title("기사 제목")
                .content("기사 내용")
                .questions(List.of("기사 질문1", "기사 질문2"))
                .build();
    }

    private Room createRoom(RoomType roomType, int num) {
        return Room.builder()
                .id("roomId" + num)
                .title("제목")
                .type(roomType)
                .build();
    }

    private InterviewRedis createInterview(Long userId, int number) {
        return InterviewRedis.builder()
                .userId(userId)
                .question("질문" + number)
                .answer("답변" + number)
                .pronunciationScore(100)
                .happy(100)
                .disgust(0)
                .sad(0)
                .surprise(0)
                .fear(0)
                .angry(0)
                .neutral(0)
                .build();
    }

    private InterviewResult createInterviewResult(User user, Report report, int num) {
        return InterviewResult.builder()
                .report(report)
                .question("질문" + num)
                .answer("답변" + num)
                .feedback("피드백" + num)
                .pronunciationScore(3)
                .happy(0.9)
                .neutral(0.8)
                .sad(0.7)
                .disgust(0.6)
                .surprise(0.5)
                .fear(0.3)
                .angry(0.1)
                .build();
    }

}