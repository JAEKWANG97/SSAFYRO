package com.ssafy.ssafyro.domain.room.redis;

import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.domain.room.RoomType;
import java.util.ArrayList;
import java.util.Set;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;

class RoomRedisTemplateRepositoryTest extends IntegrationTestSupport {

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

    @DisplayName("회의 방 세션 정보를 Json으로 직렬화한 후 Redis에 저장한다.")
    @Test
    void saveTest() {
        //given
        RoomRedis room = createRoom();

        //when
        String roomId = roomRedisRepository.save(room);

        //then
        assertThat(roomRedisRepository.findById(roomId).get().getTitle()).isEqualTo(room.getTitle());
    }

    private RoomRedis createRoom() {
        return RoomRedis.builder()
                .title("Test Room1")
                .description("Test Room Description")
                .type(RoomType.PRESENTATION)
                .status(RoomStatus.WAIT)
                .capacity(0)
                .participantCount(0)
                .userList(new ArrayList<>())
                .build();
    }
}