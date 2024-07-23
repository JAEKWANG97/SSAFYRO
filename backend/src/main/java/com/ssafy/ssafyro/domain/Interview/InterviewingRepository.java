package com.ssafy.ssafyro.domain.Interview;

import org.springframework.data.repository.CrudRepository;

public interface InterviewingRepository extends CrudRepository<Interview, String> {
//    Iterable<Interview> findByRoomIdAndUserId(String roomId, String userId);
}
