package com.ssafy.ssafyro.domain.room.redis;

import com.ssafy.ssafyro.domain.room.RoomFilterCondition;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class RoomRedisRepository {
    String ROOM_PREFIX = "room:";

    private final RedisTemplate<String, RoomRedis> redisTemplate;

    public String save(RoomRedis room) {
        redisTemplate.opsForValue().set(ROOM_PREFIX + room.getId(), room);
        return room.getId();
    }

    public List<RoomRedis> findRoomsBy(RoomFilterCondition condition) {
        return searchRoomsBy(condition);
    }

    public Optional<RoomRedis> findBy(String id) {
        return Optional.ofNullable(redisTemplate.opsForValue().get(ROOM_PREFIX + id));
    }

    public void delete(RoomRedis room) {
        redisTemplate.delete(ROOM_PREFIX + room.getId());
    }

    private List<RoomRedis> searchRoomsBy(RoomFilterCondition condition) {
        Set<String> keys = redisTemplate.keys("room:*");

        assert keys != null;
        List<RoomRedis> allRooms = keys.stream()
                .map(key -> redisTemplate.opsForValue().get(key))
                .filter(Objects::nonNull)
                .toList();

        List<RoomRedis> filteredRooms = allRooms.stream()
                .filter(room -> condition.title() == null || room.getTitle().contains(condition.title()))
                .filter(room -> condition.type() == null || condition.type().equals(room.getType().name()))
                .filter(room -> condition.capacity() == null || condition.capacity().equals(room.getCapacity()))
                .filter(room -> condition.status() == null || condition.status().equals(room.getStatus().name()))
                .collect(Collectors.toList());

        return paginateRooms(filteredRooms, condition.page(), condition.size());
    }


    private List<RoomRedis> paginateRooms(List<RoomRedis> rooms, int page, int size) {
        return rooms.stream()
                .sorted(Comparator.comparing(RoomRedis::getCreatedDate).reversed())
                .skip((long) (page - 1) * size)
                .limit(size)
                .toList();
    }

}
