package com.ssafy.ssafyro.domain.report;

import com.ssafy.ssafyro.domain.room.entity.Room;
import com.ssafy.ssafyro.domain.user.User;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PersonalityInterviewReport extends Report {

    @Builder
    private PersonalityInterviewReport(User user, Room room, int totalScore, int pronunciationScore) {
        super(user, room, totalScore, pronunciationScore);
    }
}
