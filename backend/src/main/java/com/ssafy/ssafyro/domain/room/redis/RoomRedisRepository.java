package com.ssafy.ssafyro.domain.room.redis;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class RoomRedisRepository {

    private final RedisTemplate<String, RoomRedis> redisTemplate;

    public String save(RoomRedis room) {
        String key = room.generateKey();
        redisTemplate.opsForValue().set(key, room);
        return room.getId();
    }

    public String updateStatus(RoomRedis room) {
        deleteRoomKeys(room);
        String newKey = room.generateKey();
        redisTemplate.opsForValue().set(newKey, room);
        return newKey;
    }

    public List<RoomRedis> findRooms(String type, Integer capacity, String status, int page, int size) {
        String pattern = buildPattern(type, capacity, status);
        List<RoomRedis> rooms = new ArrayList<>();
        searchRoomsByPattern(pattern, rooms);
        return paginateRooms(rooms, page, size);
    }

    public Optional<RoomRedis> findById(String id) {
        String pattern = buildPattern("*", null, "*", id);
        return searchRoomByPattern(pattern);
    }

    public void delete(RoomRedis room) {
        String key = room.generateKey();
        redisTemplate.delete(key);
    }

    private void deleteRoomKeys(RoomRedis room) {
        String pattern = buildPattern(String.valueOf(room.getType()), room.getCapacity(), "*", room.getId());
        Set<String> keys = redisTemplate.keys(pattern);
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }

    private @NotNull Optional<RoomRedis> searchRoomByPattern(String pattern) {
        Set<String> keys = redisTemplate.keys(pattern);
        if (keys != null && !keys.isEmpty()) {
            String key = keys.iterator().next();
            return Optional.ofNullable(redisTemplate.opsForValue().get(key));
        }
        return Optional.empty();
    }

    private void searchRoomsByPattern(String pattern, List<RoomRedis> rooms) {
        try (Cursor<String> cursor = redisTemplate.scan(ScanOptions.scanOptions().match(pattern).build())) {
            while (cursor.hasNext()) {
                String key = cursor.next();
                RoomRedis room = redisTemplate.opsForValue().get(key);
                if (room != null) {
                    rooms.add(room);
                }
            }
        }
    }

    private @NotNull String buildPattern(String type, Integer capacity, String status) {
        return buildPattern(type, capacity, status, "*");
    }

    private @NotNull String buildPattern(String type, Integer capacity, String status, String id) {
        return String.format("room:%s:%s:%s:%s",
                type != null ? type : "*",
                capacity != null ? capacity.toString() : "*",
                status != null ? status : "*",
                id != null ? id : "*");
    }

    private List<RoomRedis> paginateRooms(List<RoomRedis> rooms, int page, int size) {
        return rooms.stream()
                .sorted(Comparator.comparing(RoomRedis::getCreatedDate).reversed())
                .skip((long) (page - 1) * size)
                .limit(size)
                .collect(Collectors.toList());
    }
}
