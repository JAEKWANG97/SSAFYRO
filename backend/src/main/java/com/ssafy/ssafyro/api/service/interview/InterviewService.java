package com.ssafy.ssafyro.api.service.interview;

import com.ssafy.ssafyro.api.service.interview.request.QnAResultServiceRequest;
import com.ssafy.ssafyro.api.service.interview.response.ArticleResponse;
import com.ssafy.ssafyro.api.service.interview.response.FinishResponse;
import com.ssafy.ssafyro.api.service.interview.response.StartResponse;
import com.ssafy.ssafyro.domain.article.ArticleRepository;
import com.ssafy.ssafyro.domain.interview.InterviewRedisRepository;
import com.ssafy.ssafyro.domain.room.entity.Room;
import com.ssafy.ssafyro.domain.room.entity.RoomRepository;
import com.ssafy.ssafyro.domain.room.redis.RoomRedis;
import com.ssafy.ssafyro.domain.room.redis.RoomRedisRepository;
import com.ssafy.ssafyro.error.room.RoomNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class InterviewService {

    private final ChatGptResponseGenerator chatGPTFeedbackFactory;

    private final RoomRepository roomRepository;
    private final ArticleRepository articleRepository;

    private final RoomRedisRepository roomRedisRepository;
    private final InterviewRedisRepository interviewRedisRepository;

    public StartResponse startInterview(String roomId) {
        RoomRedis room = roomRedisRepository.findById(roomId)
                .orElseThrow(() -> new RoomNotFoundException("Room not found"));

        room.startInterview();

        return new StartResponse(roomRedisRepository.save(room));
    }

    public FinishResponse finishInterview(String roomId) {
        RoomRedis roomRedis = roomRedisRepository.findById(roomId)
                .orElseThrow(() -> new RoomNotFoundException("Room not found"));

        roomRedis.finishInterview();

        //방 정보 RDB 저장
        Room room = roomRedis.toEntity();
        roomRepository.save(room);

        return new FinishResponse(roomRedisRepository.save(roomRedis));
    }

    public void saveQnAResult(QnAResultServiceRequest request) {
        interviewRedisRepository.save(request.toEntity());
    }

    public ArticleResponse showArticle(String roomId) {
        AiArticle article = chatGPTFeedbackFactory.generateArticle();

        articleRepository.save(article.toEntity());

        return new ArticleResponse(
                article.title(),
                article.content(),
                article.questions()
        );
    }
}

