package com.ssafy.ssafyro.domain.interviewresult;

import com.ssafy.ssafyro.api.service.report.KoMorAnGenerator;
import com.ssafy.ssafyro.domain.interview.InterviewRedis;
import java.util.List;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "interview-results")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class InterviewResultDocument {

    @Id
    private String id;

    private Long userId;

    private String question;

    private String answer;

    private int pronunciationScore;

    private int evaluationScore;

    private double happy;

    private double neutral;

    private double sad;

    private double disgust;

    private double surprise;

    private double fear;

    private double angry;

    private List<String> questionTags;

    private List<String> answerTags;

    private InterviewResultDocument(InterviewRedis interviewRedis,
                                    List<String> questionTags,
                                    List<String> answerTags) {
        this.id = UUID.randomUUID().toString();
        this.userId = interviewRedis.getUserId();
        this.question = interviewRedis.getQuestion();
        this.answer = interviewRedis.getAnswer();
        this.pronunciationScore = interviewRedis.getPronunciationScore();
        this.evaluationScore = interviewRedis.getEvaluationScore();
        this.happy = interviewRedis.getHappy();
        this.neutral = interviewRedis.getNeutral();
        this.sad = interviewRedis.getSad();
        this.disgust = interviewRedis.getDisgust();
        this.surprise = interviewRedis.getSurprise();
        this.fear = interviewRedis.getFear();
        this.angry = interviewRedis.getAngry();
        this.questionTags = questionTags;
        this.answerTags = answerTags;
    }

    public static InterviewResultDocument create(InterviewRedis interviewRedis,
                                                 KoMorAnGenerator generator) {
        List<String> questionTags = generator.createTags(interviewRedis.getQuestion());
        List<String> answerTags = generator.createTags(interviewRedis.getAnswer());

        return new InterviewResultDocument(interviewRedis, questionTags, answerTags);
    }
}
