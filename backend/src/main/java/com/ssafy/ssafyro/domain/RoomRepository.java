package com.ssafy.ssafyro.domain;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> find(RoomType roomType);
}
