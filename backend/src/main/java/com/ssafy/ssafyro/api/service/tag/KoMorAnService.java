package com.ssafy.ssafyro.api.service.tag;

import com.ssafy.ssafyro.domain.interviewresult.InterviewResult;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResultRepository;
import com.ssafy.ssafyro.domain.tag.AnswerTag;
import com.ssafy.ssafyro.domain.tag.AnswerTagRepository;
import com.ssafy.ssafyro.domain.tag.QuestionTag;
import com.ssafy.ssafyro.domain.tag.QuestionTagRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class KoMorAnService {

    private final InterviewResultRepository interviewResultRepository;
    private final QuestionTagRepository questionTagRepository;
    private final AnswerTagRepository answerTagRepository;

    public void createTags(Long reportId) {
        List<InterviewResult> interviewResults = interviewResultRepository.findByReportId(reportId);

        for (InterviewResult interviewResult : interviewResults) {
            createQuestionTags(interviewResult);
            createAnswerTags(interviewResult);
        }
    }

    private void createQuestionTags(InterviewResult interviewResult) {
        List<String> questionNouns = KoMorAnUtils.getInstance()
                .analyze(interviewResult.getQuestion())
                .getNouns();

        List<QuestionTag> questionTags = QuestionTag.create(questionNouns);
        questionTagRepository.saveAll(questionTags);

//        interviewResult.getQuestionTags().clear();
//        interviewResult.getQuestionTags().addAll(questionTags);
        interviewResult.addQuestion(questionTags);
    }

    private void createAnswerTags(InterviewResult interviewResult) {
        List<String> answerNouns = KoMorAnUtils.getInstance()
                .analyze(interviewResult.getAnswer())
                .getNouns();

        List<AnswerTag> answerTags = AnswerTag.create(answerNouns);
        answerTagRepository.saveAll(answerTags);

//        interviewResult.getAnswerTags().clear();
        interviewResult.getAnswerTags().addAll(answerTags);
    }

}
