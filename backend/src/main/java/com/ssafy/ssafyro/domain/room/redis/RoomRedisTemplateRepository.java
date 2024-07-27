package com.ssafy.ssafyro.domain.room.redis;

import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class RoomRedisTemplateRepository {

    private static final String KEY_PREFIX = "room:";

    private final RedisTemplate<String, RoomRedis> redisTemplate;

    public String save(RoomRedis roomRedis) {
        String key = generateRandomKey();
        redisTemplate.opsForValue().set(KEY_PREFIX + key, roomRedis);

        return key;
    }

    public String save(String key, RoomRedis roomRedis) {
        redisTemplate.opsForValue().set(KEY_PREFIX + key, roomRedis);

        return key;
    }

    public Optional<RoomRedis> findById(String key) {
        return Optional.ofNullable(redisTemplate.opsForValue().get(KEY_PREFIX + key));
    }

    private String generateRandomKey() {
        return UUID.randomUUID().toString();
    }
}
