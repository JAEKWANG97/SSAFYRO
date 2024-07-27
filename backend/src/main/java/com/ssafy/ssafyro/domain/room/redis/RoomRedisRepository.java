package com.ssafy.ssafyro.domain.room.redis;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class RoomRedisRepository {

    private static final String KEY_PREFIX = "room:";

    private final RedisTemplate<String, RoomRedis> redisTemplate;

    public String save(RoomRedis roomRedis) {
        redisTemplate.opsForValue().set(KEY_PREFIX + roomRedis.getId(), roomRedis);

        return roomRedis.getId();
    }

    public Optional<RoomRedis> findById(String key) {
        return Optional.ofNullable(redisTemplate.opsForValue().get(KEY_PREFIX + key));
    }
}
