package com.ssafy.ssafyro.domain.report;

import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.domain.MajorType;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.domain.user.UserRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Transactional
class ReportRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private UserRepository userRepository;

    @DisplayName("유저의 면접 레포트 목록을 전체조회한다.")
    @Test
    void findAllByUser() {
        //given
        User user = makeUser();
        userRepository.save(user);

        List<Report> reports = List.of(
                makeReport(user, 90),
                makeReport(user, 92),
                makeReport(user, 95)
        );
        reportRepository.saveAll(reports);

        //when
        Page<Report> result = reportRepository.findAllByUser(user, Mockito.any(Pageable.class));

        //then
        assertThat(result).hasSize(3)
                .containsExactlyInAnyOrderElementsOf(reports);
    }

    private static User makeUser() {
        return User.builder()
                .providerId("providerId")
                .providerName("goole")
                .nickname("ssafyRo")
                .profileImageUrl("www.image.url")
                .majorType(MajorType.MAJOR)
                .build();
    }

    private static Report makeReport(User user, int totalScore) {
        return PersonalityInterviewReport.builder()
                .user(user)
                .room(null)
                .totalScore(totalScore)
                .pronunciationScore(3)
                .build();
    }
}