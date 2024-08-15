package com.ssafy.ssafyro.api.service.essay;

import com.ssafy.ssafyro.api.service.ai.AIResponseGenerator;
import com.ssafy.ssafyro.api.service.essay.request.EssayReviewServiceRequest;
import com.ssafy.ssafyro.api.service.essay.request.EssaySaveServiceRequest;
import com.ssafy.ssafyro.api.service.essay.response.EssayDetailResponse;
import com.ssafy.ssafyro.api.service.essay.response.EssayReviewResponse;
import com.ssafy.ssafyro.api.service.essay.response.EssaySaveResponse;
import com.ssafy.ssafyro.api.service.essay.response.EssayUpdateResponse;
import com.ssafy.ssafyro.domain.essay.Essay;
import com.ssafy.ssafyro.domain.essay.EssayRepository;
import com.ssafy.ssafyro.domain.essayquestion.EssayQuestion;
import com.ssafy.ssafyro.domain.essayquestion.EssayQuestionRepository;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.domain.user.UserRepository;
import com.ssafy.ssafyro.error.essay.EssayNotFoundException;
import com.ssafy.ssafyro.error.essayquestion.EssayQuestionNotFoundException;
import com.ssafy.ssafyro.error.user.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class EssayService {

    private final AIResponseGenerator aiResponseGenerator;

    private final UserRepository userRepository;
    private final EssayRepository essayRepository;
    private final EssayQuestionRepository essayQuestionRepository;

    public EssayReviewResponse reviewEssay(EssayReviewServiceRequest request) {
        EssayQuestion essayQuestion = getEssayQuestionBy(request.essayQuestionId());

        return new EssayReviewResponse(
                aiResponseGenerator.generateNewEssay(essayQuestion.getContent(), request.content())
        );
    }

    public EssaySaveResponse createEssayBy(Long userId, EssaySaveServiceRequest request) {
        EssayQuestion essayQuestion = getEssayQuestionBy(request.essayQuestionId());

        User user = getUserBy(userId);

        Essay essay = createEssayIfNotExist(request, user, essayQuestion);

        return new EssaySaveResponse(
                essayRepository.save(essay).getId()
        );
    }

    public EssayDetailResponse findBy(Long userId) {
        User user = getUserBy(userId);

        Essay essay = getEssayBy(user);

        return new EssayDetailResponse(essay);
    }

    public EssayUpdateResponse updateEssayBy(Long userId, EssaySaveServiceRequest request) {
        User user = getUserBy(userId);

        Essay essay = getEssayBy(user);

        essay.update(request.content());

        return new EssayUpdateResponse(essay.getId());
    }

    private EssayQuestion getEssayQuestionBy(Long essayQuestionId) {
        return essayQuestionRepository.findById(essayQuestionId)
                .orElseThrow(() -> new EssayQuestionNotFoundException("Essay question not found"));
    }

    private User getUserBy(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    private Essay getEssayBy(User user) {
        return essayRepository.findByUser(user)
                .orElseThrow(() -> new EssayNotFoundException("Essay not found"));
    }

    private Essay createEssayIfNotExist(EssaySaveServiceRequest request, User user, EssayQuestion essayQuestion) {
        return essayRepository.findByUser(user)
                .orElse(createEssay(essayQuestion, user, request.content()));
    }

    private Essay createEssay(EssayQuestion essayQuestion, User user, String content) {
        return Essay.builder()
                .question(essayQuestion)
                .user(user)
                .content(content)
                .build();
    }
}
