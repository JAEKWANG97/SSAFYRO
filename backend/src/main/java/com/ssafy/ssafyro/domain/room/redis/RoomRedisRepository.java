package com.ssafy.ssafyro.domain.room.redis;

import com.ssafy.ssafyro.domain.room.RoomFilterCondition;
import java.time.ZoneOffset;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class RoomRedisRepository {

    private final RedisTemplate<String, RoomRedis> redisTemplate;

    public String save(RoomRedis room) {
        redisTemplate.opsForZSet().add("rooms", room, room.getCreatedDate().toEpochSecond(ZoneOffset.UTC));
        return room.getId();
    }

    public List<RoomRedis> findRooms(RoomFilterCondition condition) {
        return searchRoomsByFilter(condition);
    }

    public Optional<RoomRedis> findById(String id) {
        return Optional.ofNullable(redisTemplate.opsForValue().get(id));
    }


    public void delete(RoomRedis room) {
        redisTemplate.delete(room.getId());
    }

    private List<RoomRedis> searchRoomsByFilter(RoomFilterCondition condition) {
        Set<RoomRedis> allRooms = redisTemplate.opsForZSet().range("rooms", 0, -1);

        assert allRooms != null;
        List<RoomRedis> filteredRooms = allRooms.stream()
                .filter(room -> (condition.title() == null || room.getTitle().contains(condition.title())) &&
                        (condition.type() == null || room.getType().name().equals(condition.type())) &&
                        (condition.capacity() == null || room.getCapacity() == condition.capacity()) &&
                        (condition.status() == null || room.getStatus().name().equals(condition.status())))
                .collect(Collectors.toList());

        return paginateRooms(filteredRooms, condition.page(), condition.size());
    }

    private List<RoomRedis> paginateRooms(List<RoomRedis> rooms, int page, int size) {
        return rooms.stream()
                .sorted(Comparator.comparing(RoomRedis::getCreatedDate).reversed())
                .skip((long) (page - 1) * size)
                .limit(size)
                .collect(Collectors.toList());
    }

}
