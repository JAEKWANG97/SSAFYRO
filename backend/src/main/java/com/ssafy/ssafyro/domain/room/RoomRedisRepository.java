package com.ssafy.ssafyro.domain.room;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRedisRepository extends CrudRepository<RoomRedis, Long> {

    List<RoomRedis> find(RoomType roomType);
}
