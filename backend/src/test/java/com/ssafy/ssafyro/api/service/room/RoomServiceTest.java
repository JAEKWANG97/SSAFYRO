package com.ssafy.ssafyro.api.service.room;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.api.service.room.request.RoomCreateServiceRequest;
import com.ssafy.ssafyro.api.service.room.response.RoomCreateResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomDetailResponse;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.redis.RoomRedis;
import com.ssafy.ssafyro.domain.room.redis.RoomRedisRepository;

public class RoomServiceTest extends IntegrationTestSupport {

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomRedisRepository roomRedisRepository;

    @Autowired
    private RedisTemplate<String, RoomRedis> redisTemplate;

    @AfterEach
    void tearDown() {
        redisTemplate.delete(redisTemplate.keys("room:*"));
    }

    @DisplayName("방 생성 테스트")
    @Test
    void createRoomTest() {
        // given
        RoomCreateServiceRequest roomCreateServiceRequest =
                new RoomCreateServiceRequest(1L, "test", "test", "INTERVIEW", 3);

        // when
        RoomCreateResponse roomCreateResponse = roomService.createRoom(roomCreateServiceRequest);

        // then
        assertThat(roomCreateResponse.roomId()).isNotNull();

        // 실제로 Redis에 저장되었는지 확인
        RoomRedis savedRoom =
                roomRedisRepository.findById(roomCreateResponse.roomId()).orElse(null);
        assertThat(savedRoom).isNotNull();
        assertThat(savedRoom.getTitle()).isEqualTo("test");
        assertThat(savedRoom.getType()).isEqualTo(RoomType.INTERVIEW);
        assertThat(savedRoom.getCapacity()).isEqualTo(3);
    }

    @DisplayName("방 조회 테스트")
    @Test
    void getRoomByIdTest() {
        // given
        RoomRedis room = RoomRedis.builder().title("test").description("test description")
                .type(RoomType.INTERVIEW).capacity(3).build();

        String savedRoomId = roomRedisRepository.save(room);

        // when
        RoomDetailResponse roomDetailResponse = roomService.getRoomById(savedRoomId);

        // then
        assertThat(roomDetailResponse).isNotNull();
        assertThat(roomDetailResponse.title()).isEqualTo(room.getTitle());
        assertThat(roomDetailResponse.type()).isEqualTo(room.getType());
        assertThat(roomDetailResponse.capacity()).isEqualTo(room.getCapacity());
    }



}
