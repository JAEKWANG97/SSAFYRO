package com.ssafy.ssafyro.api.service.ai;

public interface AIResponseGenerator {

    String generateFeedbackBy(String question, String answer);

    AiArticle generateArticle();

    String generateNewEssay(String question, String content);
}
