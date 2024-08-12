package com.ssafy.ssafyro.api.service.user;

import static com.ssafy.ssafyro.domain.room.RoomType.PERSONALITY;
import static com.ssafy.ssafyro.domain.room.RoomType.PRESENTATION;
import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.api.service.user.response.UserInfoResponse;
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

class UserServiceTest extends IntegrationTestSupport {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ReportRepository reportRepository;

    @DisplayName("유저의 정보를 반환한다.")
    @Test
    void getUserInfo() {
        //given
        User user = userRepository.save(creatUser());

        Room room1 = createRoom(PERSONALITY, 1);
        Room room2 = createRoom(PERSONALITY, 2);
        Room room3 = createRoom(PRESENTATION, 3);
        Room room4 = createRoom(PRESENTATION, 4);
        roomRepository.saveAll(
                List.of(room1, room2, room3, room4)
        );

        reportRepository.saveAll(
                List.of(
                        createReport(user, room1),
                        createReport(user, room2),
                        createReport(user, room3),
                        createReport(user, room4)
                )
        );

        //when
        UserInfoResponse result = userService.getUserInfo(user.getId());

        //then
        assertThat(result).isNotNull()
                .extracting("nickname", "type", "profileImageUrl", "personalCount", "presentationCount")
                .containsExactly(
                        user.getNickname(),
                        user.getMajorType(),
                        user.getProfileImageUrl(),
                        2,
                        2
                );
    }

    private User creatUser() {
        return User.builder()
                .username("pjh2996@naver.com")
                .nickname("userName")
                .providerId("providerId")
                .profileImageUrl("https://sample-image.png")
                .majorType(MajorType.MAJOR)
                .build();
    }

    private Report createReport(User user, Room room) {
        return PersonalityInterviewReport.builder()
                .user(user)
                .room(room)
                .totalScore(80)
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