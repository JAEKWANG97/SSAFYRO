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

    private static final String API_URL = "https://api.openai.com/v1/chat/completions";

    @Value("${openai.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public String generateFeedbackBy(String question, String answer) {
        HttpEntity<Request> request = new HttpEntity<>(
                new Request(createFeedbackPrompt(question, answer), 1000),
                setHeaders()
        );

        return getFeedback(request);
    }

    public AiArticle generateArticle() {
        HttpEntity<Request> request = new HttpEntity<>(
                new Request(createArticlePrompt(), 1000),
                setHeaders()
        );

        return getArticle(request);
    }

    public String generateNewEssay(String question, String content) {
        HttpEntity<Request> request = new HttpEntity<>(
                new Request(createFeedbackPrompt(question, content), 1000),
                setHeaders()
        );

        return getNewEssay(request);
    }

    private String createFeedbackPrompt(String question, String answer) {
        return "답변은 md 형식이 아닌 text로만, 질문에 대한 답변이 적절한지 피드백 해줘.\n"
                + "질문: " + question + "\n"
                + "답변: " + answer;
    }

    private String createArticlePrompt() {
        return "ssafy PT 모의 면접에 쓰일 IT 신기술 기사 제목, 1000자 이내의 내용, 그리고 그에 따른 질문 2가지 생성해주는데 기사 만들 때 키워드는 2가지 골라서 해줘  질문에 대한 답변은 필요 없어. \n"
                + "기사 제목, 기사 내용,  질문1, 질문2 는 각각 \"-------------\" 구분자로 나눠줘\n"
                + "\n"
                + "키워드 : \n"
                + "블록체인\n"
                + "메타버스\n"
                + "NFT\n"
                + "AR/VR\n"
                + "핀테크\n"
                + "클라우드\n"
                + "사물인터넷\n"
                + "빅데이터\n"
                + "인공지능\n"
                + "자율주행\n"
                + "\n"
                + "예시답안:\n"
                + "\n"
                + "기사 제목 : \n"
                + "\n"
                + "-------------\n"
                + "\n"
                + "기사 내용:\n"
                + "\n"
                + "-------------\n"
                + "\n"
                + "질문1 : \n"
                + "\n"
                + "-------------\n"
                + "\n"
                + "질문2: \n"
                + "\n";
    }

    private String createEssayReviewPrompt(String question, String content) {
        return "답변은 md 형식이 아닌 text로만, 질문에 대한 에세이가 적절한지 판단하고 첨삭해줘.\n"
                + "질문: " + question + "\n"
                + "에세이: " + content;
    }

    private String getFeedback(HttpEntity<Request> request) {
        return restTemplate.exchange(API_URL, HttpMethod.POST, request, Response.class)
                .getBody()
                .choices()
                .get(0)
                .message()
                .content();
    }

    private AiArticle getArticle(HttpEntity<Request> request) {
        String[] result = restTemplate.exchange(API_URL, HttpMethod.POST, request, Response.class)
                .getBody()
                .choices()
                .get(0)
                .message()
                .content()
                .split("-------------");

        return new AiArticle(result);
    }

    private String getNewEssay(HttpEntity<Request> request) {
        return restTemplate.exchange(API_URL, HttpMethod.POST, request, Response.class)
                .getBody()
                .choices()
                .get(0)
                .message()
                .content();
    }

    private HttpHeaders setHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");
        return headers;
    }

    private record Request(String model, List<Message> messages, int max_tokens) {

        private Request(String messages, int max_tokens) {
            this(
                    "gpt-4o-mini",
                    List.of(new Message("user", messages)),
                    max_tokens
            );
        }

        private record Message(String role, String content) {
        }
    }

    public record Response(List<Choice> choices) {

        public record Choice(Message message) {

            public record Message(String role,
                                  String content) {
            }
        }
    }
}
