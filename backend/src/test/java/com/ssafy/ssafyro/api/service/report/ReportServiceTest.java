package com.ssafy.ssafyro.api.service.report;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.BDDAssertions.tuple;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.api.service.report.response.ReportListResponse;
import com.ssafy.ssafyro.domain.MajorType;
import com.ssafy.ssafyro.domain.report.PersonalityInterviewReport;
import com.ssafy.ssafyro.domain.report.Report;
import com.ssafy.ssafyro.domain.report.ReportRepository;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.entity.Room;
import com.ssafy.ssafyro.domain.room.entity.RoomRepository;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.domain.user.UserRepository;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class ReportServiceTest extends IntegrationTestSupport {

    @Autowired
    private ReportService reportService;

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @DisplayName("유저와 페이지의 정보를 통해 면접 레포트를 조회한다.")
    @Test
    void showReports() {
        //given
        User user = createUser();
        userRepository.save(user);

        Room room1 = createRoom(1);
        Room room2 = createRoom(2);
        Room room3 = createRoom(3);
        roomRepository.save(room1);
        roomRepository.save(room2);
        roomRepository.save(room3);

        List<Report> reports = List.of(
                createReport(user, 90, room1),
                createReport(user, 92, room2),
                createReport(user, 95, room3)
        );
        reportRepository.saveAll(reports);

        //when
        ReportListResponse response = reportService.getReports(user.getId(), Pageable.unpaged());

        //then
        assertThat(response.reports()).hasSize(3)
                .extracting("totalScore", "pronunciationScore")
                .containsExactlyInAnyOrder(
                        tuple(reports.get(0).getTotalScore(), reports.get(0).getPronunciationScore()),
                        tuple(reports.get(1).getTotalScore(), reports.get(1).getPronunciationScore()),
                        tuple(reports.get(2).getTotalScore(), reports.get(2).getPronunciationScore())
                );
    }

    private User createUser() {
        return User.builder()
                .providerId("providerId")
                .providerName("google")
                .nickname("ssafyRo")
                .profileImageUrl("www.image.url")
                .majorType(MajorType.MAJOR)
                .build();
    }

    private Report createReport(User user, int totalScore, Room room) {
        return PersonalityInterviewReport.builder()
                .user(user)
                .room(room)
                .totalScore(totalScore)
                .pronunciationScore(3)
                .build();
    }

    private Room createRoom(int num) {
        return Room.builder()
                .id("roomId" + num)
                .title("제목")
                .type(RoomType.PERSONALITY)
                .build();
    }

}