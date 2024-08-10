package com.ssafy.ssafyro.domain.interviewresult;

import com.ssafy.ssafyro.api.service.interview.ChatGptResponseGenerator;
import com.ssafy.ssafyro.api.service.report.Expression;
import com.ssafy.ssafyro.domain.BaseEntity;
import com.ssafy.ssafyro.domain.interview.InterviewRedis;
import com.ssafy.ssafyro.domain.report.Report;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class InterviewResult extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "report_id")
    private Report report;

    @Column(columnDefinition = "TEXT")
    private String question;

    @Column(columnDefinition = "TEXT")
    private String answer;

    @Column(columnDefinition = "TEXT")
    private String feedback;

    private int pronunciationScore;

    private int evaluationScore;

    private double happy;

    private double neutral;

    private double sad;

    private double disgust;

    private double surprise;

    private double fear;

    private double angry;

    @Builder
    private InterviewResult(Report report,
                            String question,
                            String answer,
                            String feedback,
                            int pronunciationScore,
                            int evaluationScore,
                            double happy,
                            double neutral,
                            double sad,
                            double disgust,
                            double surprise,
                            double fear,
                            double angry) {
        this.report = report;
        this.question = question;
        this.answer = answer;
        this.feedback = feedback;
        this.pronunciationScore = pronunciationScore;
        this.evaluationScore = evaluationScore;
        this.happy = happy;
        this.neutral = neutral;
        this.sad = sad;
        this.disgust = disgust;
        this.surprise = surprise;
        this.fear = fear;
        this.angry = angry;
    }

    public static InterviewResult create(Report report,
                                         InterviewRedis interviewRedis,
                                         ChatGptResponseGenerator chatGptResponseGenerator) {
        String feedback = chatGptResponseGenerator.generateFeedbackBy(
                interviewRedis.getQuestion(),
                interviewRedis.getAnswer()
        );

        return InterviewResult.builder()
                .report(report)
                .question(interviewRedis.getQuestion())
                .answer(interviewRedis.getAnswer())
                .feedback(feedback)
                .pronunciationScore(interviewRedis.getPronunciationScore())
                .evaluationScore(interviewRedis.getEvaluationScore())
                .happy(interviewRedis.getHappy())
                .neutral(interviewRedis.getNeutral())
                .sad(interviewRedis.getSad())
                .disgust(interviewRedis.getDisgust())
                .surprise(interviewRedis.getSurprise())
                .fear(interviewRedis.getFear())
                .angry(interviewRedis.getAngry())
                .build();
    }

    public Map<Expression, Double> getTop3Expression() {
        Map<Expression, Double> expressions = new HashMap<>();
        expressions.put(Expression.ANGRY, angry);
        expressions.put(Expression.FEAR, fear);
        expressions.put(Expression.DISGUST, disgust);
        expressions.put(Expression.HAPPY, happy);
        expressions.put(Expression.NEUTRAL, neutral);
        expressions.put(Expression.SAD, sad);
        expressions.put(Expression.SURPRISE, surprise);

        return expressions.entrySet()
                .stream()
                .sorted(Map.Entry.<Expression, Double>comparingByValue().reversed())
                .limit(3)
                .collect(Collectors.toMap(
                        Entry::getKey,
                        Entry::getValue,
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));
    }

    public Long getUserId() {
        return report.getUserId();
    }
}
