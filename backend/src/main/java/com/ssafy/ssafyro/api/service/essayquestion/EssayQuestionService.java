package com.ssafy.ssafyro.api.service.essayquestion;

import com.ssafy.ssafyro.api.service.essayquestion.request.EssayQuestionDetailServiceRequest;
import com.ssafy.ssafyro.api.service.essayquestion.response.EssayQuestionDetailResponse;
import com.ssafy.ssafyro.domain.essayquestion.EssayQuestion;
import com.ssafy.ssafyro.domain.essayquestion.EssayQuestionRepository;
import com.ssafy.ssafyro.error.essayquestion.EssayQuestionNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class EssayQuestionService {

    private final EssayQuestionRepository essayQuestionRepository;

    public EssayQuestionDetailResponse findByMajorTypeAndGeneration(EssayQuestionDetailServiceRequest request) {
        EssayQuestion essayQuestion = getEssayQuestion(request);

        return new EssayQuestionDetailResponse(essayQuestion);
    }

    private EssayQuestion getEssayQuestion(EssayQuestionDetailServiceRequest request) {
        return essayQuestionRepository.findByMajorTypeAndGeneration(request.type(), request.generation())
                .orElseThrow(() -> new EssayQuestionNotFoundException("Essay question not found"));
    }
}
