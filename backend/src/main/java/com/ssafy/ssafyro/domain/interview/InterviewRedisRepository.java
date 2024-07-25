package com.ssafy.ssafyro.domain.interview;

import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface InterviewRedisRepository extends CrudRepository<InterviewRedis, String> {

    Optional<List<InterviewRedis>> findByUserId(String key);

    void saveAll(String key, List<InterviewRedis> interviews);

}
