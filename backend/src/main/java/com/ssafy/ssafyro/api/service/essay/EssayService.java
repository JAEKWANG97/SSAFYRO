package com.ssafy.ssafyro.api.service.essay;

import com.ssafy.ssafyro.api.service.essay.request.EssayReviewServiceRequest;
import com.ssafy.ssafyro.api.service.essay.request.EssaySaveServiceRequest;
import com.ssafy.ssafyro.api.service.essay.response.EssayReviewResponse;
import com.ssafy.ssafyro.api.service.essay.response.EssaySaveResponse;
import com.ssafy.ssafyro.api.service.interview.ChatGptResponseGenerator;
import com.ssafy.ssafyro.domain.essay.Essay;
import com.ssafy.ssafyro.domain.essay.EssayRepository;
import com.ssafy.ssafyro.domain.essayquestion.EssayQuestion;
import com.ssafy.ssafyro.domain.essayquestion.EssayQuestionRepository;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.domain.user.UserRepository;
import com.ssafy.ssafyro.error.essayquestion.EssayQuestionNotFoundException;
import com.ssafy.ssafyro.error.user.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class EssayService {

    private final UserRepository userRepository;
    private final EssayRepository essayRepository;
    private final EssayQuestionRepository essayQuestionRepository;

    private final ChatGptResponseGenerator chatGptResponseGenerator;

    public EssayReviewResponse reviewEssay(EssayReviewServiceRequest request) {
        EssayQuestion essayQuestion = getEssayQuestion(request.essayQuestionId());

        return new EssayReviewResponse(
                chatGptResponseGenerator.generateNewEssay(essayQuestion.getContent(), request.content())
        );
    }

    public EssaySaveResponse save(EssaySaveServiceRequest request) {
        EssayQuestion essayQuestion = getEssayQuestion(request.essayQuestionId());

        User user = getUser(request.userId());

        return new EssaySaveResponse(
                essayRepository.save(createEssay(essayQuestion, user, request.content())).getId()
        );
    }

    private EssayQuestion getEssayQuestion(Long essayQuestionId) {
        return essayQuestionRepository.findById(essayQuestionId)
                .orElseThrow(() -> new EssayQuestionNotFoundException("Essay not found"));
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    private Essay createEssay(EssayQuestion essayQuestion, User user, String content) {
        return Essay.builder()
                .question(essayQuestion)
                .user(user)
                .content(content)
                .build();
    }
}
