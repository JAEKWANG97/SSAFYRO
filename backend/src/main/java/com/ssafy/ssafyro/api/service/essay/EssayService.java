package com.ssafy.ssafyro.api.service.essay;

import com.ssafy.ssafyro.api.service.essay.request.EssayReviewServiceRequest;
import com.ssafy.ssafyro.api.service.essay.response.EssayReviewResponse;
import com.ssafy.ssafyro.api.service.interview.ChatGptResponseGenerator;
import com.ssafy.ssafyro.domain.essayquestion.EssayQuestion;
import com.ssafy.ssafyro.domain.essayquestion.EssayQuestionRepository;
import com.ssafy.ssafyro.error.essayquestion.EssayQuestionNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class EssayService {

    private final EssayQuestionRepository essayQuestionRepository;
    private final ChatGptResponseGenerator chatGptResponseGenerator;

    public EssayReviewResponse reviewEssay(EssayReviewServiceRequest request) {
        EssayQuestion essayQuestion = getEssayQuestion(request);

        return new EssayReviewResponse(
                chatGptResponseGenerator.generateNewEssay(essayQuestion.getContent(), request.content())
        );
    }

    private EssayQuestion getEssayQuestion(EssayReviewServiceRequest request) {
        return essayQuestionRepository.findById(request.essayQuestionId())
                .orElseThrow(() -> new EssayQuestionNotFoundException("Essay not found"));
    }
}
