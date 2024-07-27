package com.ssafy.ssafyro.api.service.interview;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.redis.RoomRedis;
import com.ssafy.ssafyro.domain.room.redis.RoomRedisTemplateRepository;
import com.ssafy.ssafyro.domain.room.redis.RoomStatus;
import com.ssafy.ssafyro.error.room.RoomNotFoundException;
import java.util.List;
import java.util.Set;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;

class InterviewServiceTest extends IntegrationTestSupport {

    @Autowired
    private InterviewService interviewService;

    @Autowired
    private RoomRedisTemplateRepository roomRedisRepository;

    @Autowired
    private RedisTemplate<String, RoomRedis> redisTemplate;

    @AfterEach
    void tearDown() {
        Set<String> keys = redisTemplate.keys("room:*");

        if (keys == null || keys.isEmpty()) {
            return;
        }

        redisTemplate.delete(keys);
    }

    @DisplayName("모의 면접을 시작한다.")
    @Test
    void startInterview() {
        //given
        String roomId = roomRedisRepository.save(createRoom());

        //when
        interviewService.startInterview(roomId);

        //then
        assertThat(roomRedisRepository.findById(roomId).get().getStatus()).isEqualTo(RoomStatus.ING);
    }

    @DisplayName("모의 면접 시작 시 방 아이디를 찾을 수 없는 경우 예외가 발생한다.")
    @Test
    void startInterviewWithWrongRoomId() {
        assertThatThrownBy(() -> interviewService.startInterview("wrong room id"))
                .isInstanceOf(RoomNotFoundException.class);
    }

    private RoomRedis createRoom() {
        return RoomRedis.builder()
                .title("Test Room")
                .description("Test Room Description")
                .type(RoomType.PRESENTATION)
                .status(RoomStatus.WAIT)
                .capacity(3)
                .participantCount(3)
                .userList(List.of(1L, 2L, 3L))
                .build();
    }
}