package com.ssafy.ssafyro.api.service.tag;

import static com.ssafy.ssafyro.domain.room.RoomType.PRESENTATION;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.domain.MajorType;
import com.ssafy.ssafyro.domain.article.Article;
import com.ssafy.ssafyro.domain.article.ArticleRepository;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResult;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResultRepository;
import com.ssafy.ssafyro.domain.report.PresentationInterviewReport;
import com.ssafy.ssafyro.domain.report.Report;
import com.ssafy.ssafyro.domain.report.ReportRepository;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.entity.Room;
import com.ssafy.ssafyro.domain.room.entity.RoomRepository;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.domain.user.UserRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@Transactional
class KoMorAnServiceTest extends IntegrationTestSupport {

    @Autowired
    private KoMorAnService koMorAnService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private InterviewResultRepository interviewResultRepository;

    @DisplayName("만들어진 레포트의 질문과 응답들을 태깅화한다.")
    @Test
    void createTags() {
        //given
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
        interviewResultRepository.saveAll(
                List.of(interviewResult1, interviewResult2)
        );

        //when
        koMorAnService.createTags(report.getId());

        //then
//        answerTagRepository.find
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