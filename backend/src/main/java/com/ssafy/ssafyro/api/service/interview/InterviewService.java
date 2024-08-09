package com.ssafy.ssafyro.api.service.interview;

import com.ssafy.ssafyro.api.service.interview.request.InterviewStageServiceRequest;
import com.ssafy.ssafyro.api.service.interview.request.QnAResultCreateServiceRequest;
import com.ssafy.ssafyro.api.service.interview.response.ArticleResponse;
import com.ssafy.ssafyro.api.service.interview.response.FinishResponse;
import com.ssafy.ssafyro.api.service.interview.response.InterviewStageResponse;
import com.ssafy.ssafyro.api.service.interview.response.QnAResultCreateResponse;
import com.ssafy.ssafyro.api.service.interview.response.StartResponse;
import com.ssafy.ssafyro.domain.article.Article;
import com.ssafy.ssafyro.domain.article.ArticleRepository;
import com.ssafy.ssafyro.domain.interview.InterviewRedisRepository;
import com.ssafy.ssafyro.domain.room.Stage;
import com.ssafy.ssafyro.domain.room.entity.Room;
import com.ssafy.ssafyro.domain.room.entity.RoomRepository;
import com.ssafy.ssafyro.domain.room.redis.RoomRedis;
import com.ssafy.ssafyro.domain.room.redis.RoomRedisRepository;
import com.ssafy.ssafyro.error.interview.InterviewStageOutOfException;
import com.ssafy.ssafyro.error.room.RoomNotFoundException;
import java.util.List;
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
        RoomRedis roomRedis = getRoomRedis(roomId);
        roomRedis.startInterview();

        return new StartResponse(roomRedisRepository.save(roomRedis));
    }

    public FinishResponse finishInterview(String roomId) {
        RoomRedis roomRedis = getRoomRedis(roomId);
        roomRedis.finishInterview();

        Room room = roomRedis.toEntity();
        roomRepository.save(room);

        return new FinishResponse(roomRedisRepository.save(roomRedis));
    }

    public QnAResultCreateResponse createQnAResult(Long userId, QnAResultCreateServiceRequest request) {
        return QnAResultCreateResponse.of(interviewRedisRepository.save(request.toEntity(userId)));
    }

    public ArticleResponse getArticle(String roomId) {
        Article article = articleRepository.save(
                chatGPTFeedbackFactory.generateArticle().toEntity()
        );

        return new ArticleResponse(
                article.getId(),
                article.getTitle(),
                article.getContent(),
                List.of(article.getQuestion1(), article.getQuestion2())
        );
    }

    public InterviewStageResponse changeInterviewer(String roomId, InterviewStageServiceRequest request) {
        RoomRedis roomRedis = getRoomRedis(roomId);
        Stage nowStage = request.nowStage();

        if (roomRedis.isStageOver(nowStage.getIndex())) {
            throw new InterviewStageOutOfException("모든 순서가 끝났습니다.");
        }

        return new InterviewStageResponse(
                nowStage,
                roomRedis.getNowUser(nowStage.getIndex())
        );
    }

    private RoomRedis getRoomRedis(String roomId) {
        return roomRedisRepository.findBy(roomId)
                .orElseThrow(() -> new RoomNotFoundException("Room not found"));
    }

}

