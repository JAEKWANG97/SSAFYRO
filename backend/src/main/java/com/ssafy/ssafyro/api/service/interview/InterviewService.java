package com.ssafy.ssafyro.api.service.interview;

import com.ssafy.ssafyro.api.service.interview.request.QnAResultServiceRequest;
import com.ssafy.ssafyro.api.service.interview.response.ArticleResponse;
import com.ssafy.ssafyro.api.service.interview.response.StartResponse;
import com.ssafy.ssafyro.domain.interview.InterviewRedisRepository;
import com.ssafy.ssafyro.domain.room.redis.RoomRedis;
import com.ssafy.ssafyro.domain.room.redis.RoomRedisRepository;
import com.ssafy.ssafyro.error.room.RoomNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class InterviewService {

    private final RoomRedisRepository roomRedisRepository;
    private final InterviewRedisRepository interviewRedisRepository;

    public StartResponse startInterview(String roomId) {
        RoomRedis room = roomRedisRepository.findById(roomId)
                .orElseThrow(() -> new RoomNotFoundException("Room not found"));

        room.startInterview();

        return new StartResponse(roomRedisRepository.save(room));
    }

    public ArticleResponse showArticle(String roomId) {
        return new ArticleResponse("", "", List.of());
    }

    public void saveQnAResult(QnAResultServiceRequest request) {
        interviewRedisRepository.save(request.toEntity());
    }
}

