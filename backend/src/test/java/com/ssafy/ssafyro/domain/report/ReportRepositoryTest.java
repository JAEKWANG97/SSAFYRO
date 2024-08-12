package com.ssafy.ssafyro.domain.report;

import static com.ssafy.ssafyro.domain.room.RoomType.PRESENTATION;
import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.domain.MajorType;
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

    @DisplayName("유저의 면접 레포트 목록을 전체조회한다.")
    @Test
    void findAllByUser() {
        //given
        User user = creatUser();
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
        User user = userRepository.save(creatUser());
        Room room1 = createRoom(RoomType.PERSONALITY, 1);
        Room room2 = createRoom(RoomType.PERSONALITY, 2);
        roomRepository.saveAll(List.of(room1, room2));

        Report report1 = createReport(user, room1, 80);
        Report report2 = createReport(user, room2, 80);
        reportRepository.saveAll(List.of(report1, report2));

        //when
        long result = reportRepository.countReportsType(RoomType.PERSONALITY, user);

        //then
        assertThat(result).isEqualTo(2);
    }

    @DisplayName("PT 면접 횟수를 반환합니다.")
    @Test
    void countReportsPresentation() {
        //given
        User user = userRepository.save(creatUser());
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
        User user = userRepository.save(creatUser());

        //when
        long result = reportRepository.countReportsType(PRESENTATION, user);

        //then
        assertThat(result).isEqualTo(0);
    }

    private User creatUser() {
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

    private Room createRoom(RoomType roomType, int num) {
        return Room.builder()
                .id("roomId" + num)
                .title("제목")
                .type(roomType)
                .build();
    }
}