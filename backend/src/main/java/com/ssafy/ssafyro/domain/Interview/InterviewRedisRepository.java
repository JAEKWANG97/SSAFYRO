package com.ssafy.ssafyro.domain.Interview;

import org.springframework.data.repository.CrudRepository;

public interface InterviewRedisRepository extends CrudRepository<InterviewRedis, String> {
//    Iterable<Interview> findByRoomIdAndUserId(String roomId, String userId);
}
