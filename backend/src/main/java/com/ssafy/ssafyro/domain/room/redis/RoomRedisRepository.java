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
        String Key = room.generateKey();
        redisTemplate.opsForValue().set(Key, room);
        return room.getId();
    }

    public String updateStatus(RoomRedis room) {
        String pattern =
                String.format("room:%s:%d:*:%s", room.getType(), room.getCapacity(), room.getId());
        Set<String> keys = redisTemplate.keys(pattern);
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
        String newKey = room.generateKey();
        redisTemplate.opsForValue().set(newKey, room);
        return newKey;
    }

    public List<RoomRedis> findRooms(String type, Integer capacity, String status, int page,
            int size) {
        String pattern = getPattern(type, capacity, status);
        List<RoomRedis> rooms = new ArrayList<>();

        try (Cursor<String> cursor =
                redisTemplate.scan(ScanOptions.scanOptions().match(pattern).build())) {
            while (cursor.hasNext()) {
                String key = cursor.next();
                RoomRedis room = redisTemplate.opsForValue().get(key);
                if (room != null) {
                    rooms.add(room);
                }
            }
        }

        return rooms.stream().sorted(Comparator.comparing(RoomRedis::getCreatedDate).reversed())
                .skip((long) (page - 1) * size).limit(size).collect(Collectors.toList());
    }


    public Optional<RoomRedis> findById(String id) {
        String pattern = "room:*:*:*:" + id;
        Set<String> keys = redisTemplate.keys(pattern);
        if (keys != null && !keys.isEmpty()) {
            String key = keys.iterator().next();
            return Optional.ofNullable(redisTemplate.opsForValue().get(key));
        }
        return Optional.empty();
    }

    public void delete(RoomRedis room) {
        String pattern = room.generateKey();
        redisTemplate.delete(pattern);
    }

    private static @NotNull String getPattern(String type, Integer capacity, String status) {
        String pattern = String.format("room:%s:%d:%s:*", type, capacity, status);
        if(type == null && capacity == null && status == null) {
            pattern = "room:*";
        } else if (type == null && capacity == null) {
            pattern = String.format("room:*:%s:*", status);
        } else if (type == null && status == null) {
            pattern = String.format("room:*:%d:*", capacity);
        } else if (capacity == null && status == null) {
            pattern = String.format("room:%s:*:*", type);
        } else if (type == null) {
            pattern = String.format("room:*:%d:%s:*", capacity, status);
        } else if (capacity == null) {
            pattern = String.format("room:%s:*:%s:*", type, status);
        } else if (status == null) {
            pattern = String.format("room:%s:%d:*:*", type, capacity);
        }
        return pattern;
    }


}
