package com.ssafy.ssafyro.domain.interview;

import java.util.List;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class InterviewRedisRepository {

    private final RedisTemplate<String, InterviewRedis> redisTemplate;

    public void save(InterviewRedis interview) {
        String key = "interview:" + interview.getUserId();

        redisTemplate.opsForList().rightPush(key, interview);
        redisTemplate.expire(key, 600, TimeUnit.SECONDS);
    }

    public List<InterviewRedis> findByUserId(Long userId) {
        String key = "interview:" + userId;

        return redisTemplate.opsForList().range(key, 0, -1);
    }

    public void delete(Long userId) {
        redisTemplate.delete("interview:" + userId);
    }
}
