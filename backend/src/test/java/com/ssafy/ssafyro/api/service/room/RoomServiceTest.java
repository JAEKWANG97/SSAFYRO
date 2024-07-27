package com.ssafy.ssafyro.api.service.room;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.tuple;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.api.service.room.request.RoomCreateServiceRequest;
import com.ssafy.ssafyro.api.service.room.request.RoomListServiceRequest;
import com.ssafy.ssafyro.api.service.room.response.RoomCreateResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomDetailResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomListResponse;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.redis.RoomRedis;
import com.ssafy.ssafyro.domain.room.redis.RoomRedisRepository;
import com.ssafy.ssafyro.domain.room.redis.RoomStatus;

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

    @DisplayName("방 목록 조회 테스트")
    @Test
    void getRoomListTest() {
        // given
        String roomType = RoomType.INTERVIEW.name();
        int capacity = 3;
        String status = RoomStatus.WAIT.name();
        int page = 1;
        int size = 10;

        RoomListServiceRequest request =
                new RoomListServiceRequest(roomType, capacity, status, page, size);

        roomRedisRepository.save(createRoom("Room 1", RoomType.INTERVIEW, 3));
        roomRedisRepository.save(createRoom("Room 2", RoomType.INTERVIEW, 3));

        // when
        RoomListResponse response = roomService.getRoomList(request);

        // then
        assertThat(response).isNotNull();
        assertThat(response.rooms()).hasSize(2);
        assertThat(response.rooms()).extracting("title", "type", "capacity")
                .containsExactlyInAnyOrder(tuple("Room 1", RoomType.INTERVIEW, 3),
                        tuple("Room 2", RoomType.INTERVIEW, 3));
    }

    @DisplayName("빈 방 목록 조회 테스트")
    @Test
    void getEmptyRoomListTest() {
        // given
        String roomType = RoomType.INTERVIEW.name();
        int capacity = 3;
        String status = RoomStatus.WAIT.name();
        int page = 1;
        int size = 10;

        RoomListServiceRequest request =
                new RoomListServiceRequest(roomType, capacity, status, page, size);


        // when
        RoomListResponse response = roomService.getRoomList(request);

        // then
        assertThat(response).isNotNull();
        assertThat(response.rooms()).isEmpty();
    }

    private RoomRedis createRoom(String title, RoomType type, int capacity) {
        return RoomRedis.builder().title(title).description("Test Room Description").type(type)
                .capacity(capacity).build();
    }


}
