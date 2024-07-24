package com.ssafy.ssafyro.domain.room.redis;

import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.domain.room.RoomType;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;


class RoomRedisRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private RoomRedisRepository roomRedisRepository;

    @BeforeEach
    void setUp() {
        roomRedisRepository.deleteAll();
    }

    @AfterEach
    void tearDown() {
        roomRedisRepository.deleteAll();
    }

    @DisplayName("정상적으로 방을 등록한다.")
    @Test
    void givenValidRoom_whenSave_thenRoomIsSavedCorrectly() {
        // given
        RoomRedis room = createRoom("title", "description", RoomType.PRESENTATION, RoomStatus.WAIT, 3, 1, List.of(1L));

        // when
        RoomRedis saved = roomRedisRepository.save(room);

        // then
        assertThat(saved)
                .extracting("title", "description", "type", "status", "capacity", "participantCount", "userList")
                .contains("title", "description", RoomType.PRESENTATION, RoomStatus.WAIT, 3, 1, List.of(1L));
    }

    private RoomRedis createRoom(
            String title,
            String description,
            RoomType roomType,
            RoomStatus roomStatus,
            int capacity,
            int participantCount,
            List<Long> userList) {
        return RoomRedis.builder()
                .title(title)
                .description(description)
                .type(roomType)
                .status(roomStatus)
                .capacity(capacity)
                .participantCount(participantCount)
                .userList(userList)
                .build();
    }
}
