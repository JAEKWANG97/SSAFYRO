//package com.ssafy.ssafyro.domain.room.redis;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
//
//import com.ssafy.ssafyro.IntegrationTestSupport;
//import com.ssafy.ssafyro.domain.room.RoomType;
//import java.util.List;
//import java.util.NoSuchElementException;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//
//
//class RoomRedisRepositoryTest1 extends IntegrationTestSupport {
//
//    @Autowired
//    private RoomRedisTemplateRepository roomRedisRepository;
//
//    @AfterEach
//    void tearDown() {
//        roomRedisRepository.deleteAll();
//    }
//
//    @DisplayName("정상적으로 방을 등록한다.")
//    @Test
//    void givenValidRoom_whenSave_thenRoomIsSavedCorrectly() {
//        // given
//        RoomRedis room = RoomRedis.builder().title("title").description("description").type(RoomType.PRESENTATION)
//                .status(RoomStatus.WAIT).capacity(3).participantCount(1).userList(List.of(1L)).build();
//
//        // when
//        RoomRedis saved = roomRedisRepository.save(room);
//
//        // then
//        assertThat(saved)
//                .extracting("title", "description", "type", "status", "capacity", "participantCount", "userList")
//                .contains("title", "description", RoomType.PRESENTATION, RoomStatus.WAIT, 3, 1, List.of(1L));
//    }
//
//    @DisplayName("저장된 방을 ID로 조회한다.")
//    @Test
//    void givenRoomId_whenFindById_thenReturnsRoom() {
//
//        RoomRedis room = RoomRedis.builder().title("Study").description("Study room").type(RoomType.PRESENTATION)
//                .status(RoomStatus.WAIT).capacity(3).participantCount(2).userList(List.of(1L, 2L)).build();
//        roomRedisRepository.save(room);
//
//        RoomRedis foundRoom = roomRedisRepository.findById(room.getId()).orElseThrow();
//
//        assertThat(foundRoom)
//                .extracting("title", "description", "type", "status", "capacity", "participantCount", "userList")
//                .contains("Study", "Study room", RoomType.PRESENTATION, RoomStatus.WAIT, 3, 2, List.of(1L, 2L));
//    }
//
//    @DisplayName("저장된 방을 삭제한다.")
//    @Test
//    void givenRoom_whenDelete_thenRoomIsDeleted() {
//        // given
//        RoomRedis room = RoomRedis.builder().title("title").description("description").type(RoomType.PRESENTATION)
//                .status(RoomStatus.WAIT).capacity(3).participantCount(1).userList(List.of(1L)).build();
//        RoomRedis saved = roomRedisRepository.save(room);
//
//        // when
//        roomRedisRepository.delete(saved);
//        boolean exists = roomRedisRepository.existsById(saved.getId());
//
//        // then
//        assertThat(exists).isFalse();
//    }
//
//    @DisplayName("존재하지 않는 ID로 방을 조회할 때 적절한 예외를 반환한다.")
//    @Test
//    void givenNonExistentId_whenFindById_thenThrowsException() {
//        // given
//        String nonExistentId = "999";
//
//        // when & then
//        assertThatExceptionOfType(NoSuchElementException.class)
//                .isThrownBy(() -> roomRedisRepository.findById(nonExistentId).orElseThrow());
//    }
//
//}
