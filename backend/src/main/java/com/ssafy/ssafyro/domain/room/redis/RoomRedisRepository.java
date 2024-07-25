package com.ssafy.ssafyro.domain.room.redis;

import com.ssafy.ssafyro.domain.room.RoomType;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRedisRepository extends CrudRepository<RoomRedis, Long> {

    List<RoomRedis> find(RoomType roomType);
}
