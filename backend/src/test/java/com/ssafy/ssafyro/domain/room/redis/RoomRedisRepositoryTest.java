package com.ssafy.ssafyro.domain.room.redis;

import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.domain.room.RoomFilterCondition;
import com.ssafy.ssafyro.domain.room.RoomType;
import java.util.List;
import java.util.Set;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;

//@Disabled
class RoomRedisRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private RoomRedisRepository roomRedisRepository;

    @Autowired
    private RedisTemplate<String, RoomRedis> redisTemplate;

    @AfterEach
    void tearDown() {
        Set<String> keys = redisTemplate.keys("room:*");
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }

    @DisplayName("회의 방 정보를 Redis에 저장하고 조회한다.")
    @Test
    void saveAndFindTest() {
        // given
        RoomRedis room = createRoom("Test Room", RoomType.PRESENTATION, 3);

        // when
        roomRedisRepository.save(room);
        RoomRedis foundRoom = roomRedisRepository.findById(room.getId()).orElse(null);

        // then
        assertThat(foundRoom).isNotNull();
        assertThat(foundRoom.getTitle()).isEqualTo("Test Room");
        assertThat(foundRoom.getType()).isEqualTo(RoomType.PRESENTATION);
        assertThat(foundRoom.getCapacity()).isEqualTo(3);
        assertThat(foundRoom.getStatus()).isEqualTo(RoomStatus.WAIT);
    }

    @DisplayName("필터 조건에 맞는 방 목록을 조회한다.")
    @Test
    void findRoomsTest() {
        // given
        RoomRedis room1 = createRoom("Room1", RoomType.PRESENTATION, 3);
        RoomRedis room2 = createRoom("Room2", RoomType.PERSONALITY, 3);
        RoomRedis room3 = createRoom("Room3", RoomType.PRESENTATION, 3);
        roomRedisRepository.save(room1);
        roomRedisRepository.save(room2);
        roomRedisRepository.save(room3);

        RoomFilterCondition condition = RoomFilterCondition.builder()
                .title("Room")
                .type(RoomType.PRESENTATION.name())
                .capacity(3)
                .status(RoomStatus.WAIT.name())
                .page(1)
                .size(10)
                .build();

        // when
        List<RoomRedis> rooms = roomRedisRepository.findRooms(condition);

        // then
        assertThat(rooms).extracting("title").containsExactlyInAnyOrder("Room1", "Room3");
    }

    @DisplayName("페이지네이션이 적용된 방 목록을 조회한다.")
    @Test
    void findRoomsWithPaginationTest() {
        // given
        saveRooms();

        RoomFilterCondition condition1 = RoomFilterCondition.builder()
                .type(RoomType.PRESENTATION.name())
                .capacity(3)
                .status(RoomStatus.WAIT.name())
                .page(1)
                .size(10)
                .build();

        RoomFilterCondition condition2 = RoomFilterCondition.builder()
                .type(RoomType.PRESENTATION.name())
                .capacity(3)
                .status(RoomStatus.WAIT.name())
                .page(2)
                .size(10)
                .build();

        // when
        List<RoomRedis> firstPage = roomRedisRepository.findRooms(condition1);
        List<RoomRedis> secondPage = roomRedisRepository.findRooms(condition2);

        // then
        assertThat(firstPage).hasSize(10);
        assertThat(secondPage).hasSize(5);
    }

    @DisplayName("type = null 인 condition 으로 방 목록을 조회한다.")
    @Test
    void test() {
        // given
        saveRooms();

        RoomFilterCondition condition1 = RoomFilterCondition.builder()
                .type(null)
                .capacity(3)
                .status(RoomStatus.WAIT.name())
                .page(1)
                .size(10)
                .build();

        RoomFilterCondition condition2 = RoomFilterCondition.builder()
                .type(null)
                .capacity(3)
                .status(RoomStatus.WAIT.name())
                .page(2)
                .size(10)
                .build();
        // when
        List<RoomRedis> firstPage = roomRedisRepository.findRooms(condition1);
        List<RoomRedis> secondPage = roomRedisRepository.findRooms(condition2);



        // then
        assertThat(firstPage).hasSize(10);
        assertThat(secondPage).hasSize(5);

    }

    @DisplayName("방 상태를 변경한다.")
    @Test
    void changeRoomStatusTest() {
        // given
        RoomRedis room = createRoom("Test Room", RoomType.PERSONALITY, 2);
        roomRedisRepository.save(room);

        // when
        room.startInterview();
        roomRedisRepository.save(room);
        RoomRedis startedRoom = roomRedisRepository.findById(room.getId()).orElse(null);

        room.finishInterview();
        roomRedisRepository.save(room);
        RoomRedis endedRoom = roomRedisRepository.findById(room.getId()).orElse(null);

        // then
        assertThat(startedRoom).isNotNull();
        assertThat(startedRoom.getStatus()).isEqualTo(RoomStatus.ING);
        assertThat(endedRoom).isNotNull();
        assertThat(endedRoom.getStatus()).isEqualTo(RoomStatus.END);
    }


    @DisplayName("저장된 방을 삭제한다.")
    @Test
    void givenRoom_whenDelete_thenRoomIsDeleted() {
        // given
        RoomRedis room = createRoom("Test Room", RoomType.PRESENTATION, 3);
        roomRedisRepository.save(room);

        // when
        roomRedisRepository.delete(room);

        // then
        assertThat(roomRedisRepository.findById(room.getId())).isNotPresent();
    }

    private RoomRedis createRoom(String title, RoomType type, int capacity) {
        return RoomRedis.builder()
                .title(title)
                .description("Test Room Description")
                .type(type)
                .capacity(capacity).build();
    }

    private void saveRooms() {
        for (int i = 0; i < 15; i++) {
            roomRedisRepository.save(createRoom("Room" + i, RoomType.PRESENTATION, 3));
        }
    }
}
