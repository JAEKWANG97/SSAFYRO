package com.ssafy.ssafyro.api.service.interview;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.redis.RoomRedis;
import com.ssafy.ssafyro.domain.room.redis.RoomRedisRepository;
import com.ssafy.ssafyro.domain.room.redis.RoomStatus;
import com.ssafy.ssafyro.error.room.RoomNotFoundException;
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
    private RoomRedisRepository roomRedisRepository;

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
        // given
        RoomRedis room = createRoom();
        roomRedisRepository.save(room);

        assertThat(roomRedisRepository.findById(room.getId()).get().getTitle())
                .isEqualTo(createRoom().getTitle());
        assertThat(roomRedisRepository.findById(room.getId()).get().getType())
                .isEqualTo(createRoom().getType());
        assertThat(roomRedisRepository.findById(room.getId()).get().getCapacity())
                .isEqualTo(createRoom().getCapacity());
        assertThat(roomRedisRepository.findById(room.getId()).get().getStatus())
                .isEqualTo(RoomStatus.WAIT);

        // when
        interviewService.startInterview(room.getId());

        // then
        assertThat(roomRedisRepository.findById(room.getId()).get().getStatus())
                .isEqualTo(RoomStatus.ING);
    }

    @DisplayName("모의 면접 시작 시 방 아이디를 찾을 수 없는 경우 예외가 발생한다.")
    @Test
    void startInterviewWithWrongRoomId() {
        assertThatThrownBy(() -> interviewService.startInterview("wrong room id"))
                .isInstanceOf(RoomNotFoundException.class);
    }

    private RoomRedis createRoom() {
        return RoomRedis.builder().title("Test Room").description("Test Room Description")
                .type(RoomType.PRESENTATION).capacity(3).build();
    }
}
