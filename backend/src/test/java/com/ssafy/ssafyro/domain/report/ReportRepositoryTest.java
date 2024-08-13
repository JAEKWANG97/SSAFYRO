package com.ssafy.ssafyro.domain.report;

import static com.ssafy.ssafyro.domain.room.RoomType.PERSONALITY;
import static com.ssafy.ssafyro.domain.room.RoomType.PRESENTATION;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.tuple;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.domain.MajorType;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResult;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResultRepository;
import com.ssafy.ssafyro.domain.report.dto.ReportAllScoreAverageDto;
import com.ssafy.ssafyro.domain.report.dto.ReportExpressionDto;
import com.ssafy.ssafyro.domain.report.dto.ReportScoreDto;
import com.ssafy.ssafyro.domain.report.dto.ReportUserAverageDto;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.entity.Room;
import com.ssafy.ssafyro.domain.room.entity.RoomRepository;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.domain.user.UserRepository;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class ReportRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private InterviewResultRepository interviewResultRepository;

    @DisplayName("유저의 면접 레포트 목록을 전체조회한다.")
    @Test
    void findAllByUser() {
        //given
        User user = createUser();
        userRepository.save(user);

        List<Report> reports = List.of(
                createReport(user, null, 90),
                createReport(user, null, 92),
                createReport(user, null, 95)
        );
        reportRepository.saveAll(reports);

        //when
        Page<Report> result = reportRepository.findAllByUser(user, Mockito.any(Pageable.class));

        //then
        assertThat(result.getContent()).hasSize(3)
                .containsExactlyInAnyOrderElementsOf(reports);
    }

    @DisplayName("인성 면접 횟수를 반환합니다.")
    @Test
    void countReportsPersonal() {
        //given
        User user = userRepository.save(createUser());
        Room room1 = createRoom(PERSONALITY, 1);
        Room room2 = createRoom(PERSONALITY, 2);
        roomRepository.saveAll(List.of(room1, room2));

        Report report1 = createReport(user, room1, 80);
        Report report2 = createReport(user, room2, 80);
        reportRepository.saveAll(List.of(report1, report2));

        //when
        long result = reportRepository.countReportsType(PERSONALITY, user);

        //then
        assertThat(result).isEqualTo(2);
    }

    @DisplayName("PT 면접 횟수를 반환합니다.")
    @Test
    void countReportsPresentation() {
        //given
        User user = userRepository.save(createUser());
        Room room1 = createRoom(PRESENTATION, 1);
        Room room2 = createRoom(PRESENTATION, 2);
        roomRepository.saveAll(List.of(room1, room2));

        Report report1 = createReport(user, room1, 80);
        Report report2 = createReport(user, room2, 80);
        reportRepository.saveAll(List.of(report1, report2));

        //when
        long result = reportRepository.countReportsType(PRESENTATION, user);

        //then
        assertThat(result).isEqualTo(2);
    }

    @DisplayName("면접 이력이 없으면 면접 횟수는 0을 반환한다.")
    @Test
    void countReportsType() {
        //given
        User user = userRepository.save(createUser());

        //when
        long result = reportRepository.countReportsType(PRESENTATION, user);

        //then
        assertThat(result).isEqualTo(0);
    }

    @DisplayName("사용자의 모든 레포트 점수 평균을 계산한다.")
    @Test
    void findTotalAvgBy() {
        //given
        User user = userRepository.save(createUser());

        Room room1 = createRoom(PERSONALITY, 1);
        Room room2 = createRoom(PERSONALITY, 2);
        Room room3 = createRoom(PRESENTATION, 3);
        roomRepository.saveAll(List.of(room1, room2, room3));

        Report report1 = createReport(user, room1, 90, 2);
        Report report2 = createReport(user, room2, 100, 3);
        Report report3 = createReport(user, room3, 80, 4);
        reportRepository.saveAll(List.of(report1, report2, report3));

        InterviewResult interviewResult1 = createInterviewResult(report1);
        InterviewResult interviewResult2 = createInterviewResult(report2);
        InterviewResult interviewResult3 = createInterviewResult(report3);
        interviewResultRepository.saveAll(List.of(interviewResult1, interviewResult2, interviewResult3));

        //when
        ReportUserAverageDto resultPersonal = reportRepository.findTotalAvgBy(PERSONALITY, user).get();
        ReportUserAverageDto resultPresentation = reportRepository.findTotalAvgBy(PRESENTATION, user).get();

        //then
        assertThat(resultPersonal).isNotNull()
                .extracting("totalScore", "pronunciationScore", "happy", "neutral")
                .containsExactly(
                        (90 + 100) / 2.0,
                        (2 + 3) / 2.0,
                        0.9,
                        0.8
                );
        assertThat(resultPresentation).isNotNull()
                .extracting("totalScore", "pronunciationScore", "happy", "neutral")
                .containsExactly(
                        80.0,
                        4.0,
                        0.9,
                        0.8
                );
    }

    @DisplayName("레포트 타입 별 모든 유저의 레포트 점수의 평균을 조회한다.")
    @Test
    void findAllAvgScoreBy() {
        //given
        User user1 = userRepository.save(createUser());
        User user2 = userRepository.save(createUser());

        Room room1 = createRoom(PERSONALITY, 1);
        Room room2 = createRoom(PERSONALITY, 2);
        Room room3 = createRoom(PRESENTATION, 3);
        roomRepository.saveAll(List.of(room1, room2, room3));

        Report report1 = createReport(user1, room1, 90, 2);
        Report report2 = createReport(user2, room2, 100, 3);
        Report report3 = createReport(user1, room3, 80, 4);
        reportRepository.saveAll(List.of(report1, report2, report3));

        //when
        ReportAllScoreAverageDto result = reportRepository.findAllAvgScoreBy(PERSONALITY).get();

        //then
        assertThat(result).isNotNull()
                .extracting("totalScore", "pronunciationScore")
                .containsExactly(
                        (report1.getTotalScore() + report2.getTotalScore()) / 2.0,
                        (report1.getPronunciationScore() + report2.getPronunciationScore()) / 2.0
                );
    }

    @DisplayName("유저의 모든 레포트 총점 및 발음 점수를 전체 조회한다.")
    @Test
    void findScoreBy() {
        //given
        User user1 = userRepository.save(createUser());
        User user2 = userRepository.save(createUser());

        Room room1 = createRoom(PERSONALITY, 1);
        Room room2 = createRoom(PERSONALITY, 2);
        Room room3 = createRoom(PERSONALITY, 3);
        Room room4 = createRoom(PRESENTATION, 4);
        roomRepository.saveAll(List.of(room1, room2, room3, room4));

        Report report1 = createReport(user1, room1, 90, 2);
        Report report2 = createReport(user2, room2, 100, 3);
        Report report3 = createReport(user1, room3, 80, 4);
        Report report4 = createReport(user1, room4, 80, 4);
        reportRepository.saveAll(List.of(report1, report2, report3, report4));

        //when
        List<ReportScoreDto> result = reportRepository.findScoreBy(PERSONALITY, user1);

        //then
        assertThat(result).isNotNull()
                .extracting("title", "totalScore", "pronunciationScore")
                .containsExactlyInAnyOrder(
                        tuple("제목1", 90, 2),
                        tuple("제목3", 80, 4)
                );
    }

    @DisplayName("유저의 모든 레포트 표정 평균을 반환한다.")
    @Test
    void findAvgExpressionBy() {
        User user = userRepository.save(createUser());

        Room room1 = createRoom(PERSONALITY, 1);
        Room room2 = createRoom(PERSONALITY, 2);
        Room room3 = createRoom(PRESENTATION, 3);
        roomRepository.saveAll(List.of(room1, room2, room3));

        Report report1 = createReport(user, room1, 90, 2);
        Report report2 = createReport(user, room2, 100, 3);
        Report report3 = createReport(user, room3, 80, 4);
        reportRepository.saveAll(List.of(report1, report2, report3));

        InterviewResult interviewResult1 = createInterviewResult(report1);
        InterviewResult interviewResult2 = createInterviewResult(report2);
        InterviewResult interviewResult3 = createInterviewResult(report3);
        interviewResultRepository.saveAll(List.of(interviewResult1, interviewResult2, interviewResult3));

        //when
        ReportExpressionDto result = reportRepository.findAvgExpressionBy(PERSONALITY, user).get();

        //then
        assertThat(result).isNotNull()
                .extracting("happy", "neutral")
                .containsExactly(
                        (0.9 + 0.9) / 2,
                        (0.8 + 0.8) / 2
                );
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

    private Report createReport(User user, Room room, int totalScore) {
        return PersonalityInterviewReport.builder()
                .user(user)
                .room(room)
                .totalScore(totalScore)
                .pronunciationScore(3)
                .build();
    }

    private Report createReport(User user, Room room, int totalScore, int pronunciationScore) {
        return PersonalityInterviewReport.builder()
                .user(user)
                .room(room)
                .totalScore(totalScore)
                .pronunciationScore(pronunciationScore)
                .build();
    }

    private Room createRoom(RoomType roomType, int num) {
        return Room.builder()
                .id("roomId" + num)
                .title("제목" + num)
                .type(roomType)
                .build();
    }

    private InterviewResult createInterviewResult(Report report) {
        return InterviewResult.builder()
                .report(report)
                .question("질문")
                .answer("답변")
                .feedback("피드백")
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