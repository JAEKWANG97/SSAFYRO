package com.ssafy.ssafyro.api.service.interview;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class ChatGptResponseGenerator {

    private static final String API_URL = "https://api.openai.com/v1/completions";

    @Value("${openai.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public String generateFeedbackBy(String question, String answer) {
        HttpEntity<Request> request = new HttpEntity<>(
                new Request(createFeedbackPrompt(question, answer)),
                setHeaders()
        );

        return getFeedback(request);
    }

    private String createFeedbackPrompt(String question, String answer) {
        return "질문에 대한 답변이 적절한지 피드백 해줘.\n"
                + "질문: " + question + "\n"
                + "답변: " + answer;
    }

    private String getFeedback(HttpEntity<Request> request) {
        return restTemplate.exchange(API_URL, HttpMethod.POST, request, Response.class)
                .getBody()
                .choices()
                .get(0)
                .text();
    }

    public AiArticle generateArticle() {
        HttpEntity<Request> request = new HttpEntity<>(
                new Request(createArticlePrompt()),
                setHeaders()
        );

        return getArticle(request);
    }

    private String createArticlePrompt() {
        return "Presentation 면접을 볼건데 IT 관련 기사 하나와 기사에 맞는 질문 1개만 뽑아줘.\n"
                + "결과는 기사 제목, 기사 내용, 질문 순서로 구분자(:)로 나눠줘.";
    }

    private HttpHeaders setHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");
        return headers;
    }

    private AiArticle getArticle(HttpEntity<Request> request) {
        String[] result = restTemplate.exchange(API_URL, HttpMethod.POST, request, Response.class)
                .getBody()
                .choices()
                .get(0)
                .text()
                .split(":");

        return new AiArticle(result);
    }

    private record Request(String model, String prompt, int maxToken) {

        private Request(String prompt) {
            this("gpt-3.5-turbo-instruct", prompt, 100);
        }
    }

    private record Response(List<Choice> choices) {

        private record Choice(String text) {
        }
    }
}
