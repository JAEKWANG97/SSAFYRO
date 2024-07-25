package com.ssafy.ssafyro.api.service.interview;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ssafyro.IntegrationTestSupport;
import com.ssafy.ssafyro.api.controller.interview.request.QnAResultRequest;
import com.ssafy.ssafyro.api.service.interview.request.QnAResultServiceRequest;
import com.ssafy.ssafyro.domain.interview.InterviewRedis;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;

class InterviewServiceTest extends IntegrationTestSupport {

    @Autowired
    private InterviewService interviewService;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @DisplayName("면접 답변에 대한 질문, 답변, 표정, 발음에 대한 점수를 Json 형식으로 변환 후 List 에 저장한다.")
    @Test
    void saveQnAResult() throws JsonProcessingException {
        //given
        String userId = "userId1";
        double orderNumber = 1.0;
        QnAResultRequest request = createQnAResultRequest(orderNumber, userId);
        QnAResultServiceRequest serviceRequest = request.toServiceRequest();

        String expectedJson = objectMapper.writeValueAsString(InterviewRedis.builder()
                .userId(userId)
                .question("question1.0")
                .answer("answer1.0")
                .pronunciationScore((int) orderNumber)
                .happy(orderNumber)
                .disgust(orderNumber)
                .sad(orderNumber)
                .surprise(orderNumber)
                .fear(orderNumber)
                .angry(orderNumber)
                .neutral(orderNumber)
                .build());
        //when
        interviewService.saveQnAResult(serviceRequest);

        //then
        List<Object> savedValues = redisTemplate.opsForList().range(userId, 0, -1);
        assertThat(savedValues).hasSize(1);
//        assertThat(savedValues).contains(expectedJson);
    }

    private QnAResultRequest createQnAResultRequest(double orderNumber, String userId) {
        return QnAResultRequest.builder()
                .userId(userId)
                .question("question" + orderNumber)
                .answer("answer" + orderNumber)
                .pronunciationScore((int) orderNumber)
                .happy(orderNumber)
                .disgust(orderNumber)
                .sad(orderNumber)
                .surprise(orderNumber)
                .fear(orderNumber)
                .angry(orderNumber)
                .neutral(orderNumber)
                .build();
    }
}