package com.ssafy.ssafyro.api.service.interview;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ssafyro.api.controller.interview.request.StartRequest;
import com.ssafy.ssafyro.api.service.interview.request.QnAResultServiceRequest;
import com.ssafy.ssafyro.api.service.interview.response.ArticleResponse;
import com.ssafy.ssafyro.api.service.interview.response.StartResponse;
import com.ssafy.ssafyro.domain.interview.InterviewRedis;
import java.util.List;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InterviewService {

    //    private final InterviewRedisRepository interviewRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    public StartResponse startInterview(StartRequest startRequest) {
        return new StartResponse("모집완료");
    }

    public ArticleResponse showArticle(String roomId) {
        return new ArticleResponse("", "", List.of());
    }

    public void saveQnAResult(QnAResultServiceRequest request) {
        String userId = request.userId();
        String redisKey = "interview:" + userId;
        InterviewRedis interview = request.toEntity();

        //예외처리 필요
        try {
            String interviewJson = objectMapper.writeValueAsString(interview);
            redisTemplate.opsForList().rightPush(redisKey, interviewJson);
            redisTemplate.expire(redisKey, 600, TimeUnit.SECONDS);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

//        List<InterviewRedis> interviews = interviewRepository.findByUserId(redisKey).orElse(new ArrayList<>());
//        interviews.add(interview);
//        interviewRepository.saveAll(redisKey, interviews);
    }

}
