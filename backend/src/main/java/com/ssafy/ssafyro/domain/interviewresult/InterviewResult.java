package com.ssafy.ssafyro.domain.interviewresult;

import com.ssafy.ssafyro.domain.BaseEntity;
import com.ssafy.ssafyro.domain.interview.InterviewRedis;
import com.ssafy.ssafyro.domain.report.Report;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    private String question;

    private String answer;

    private String feedback;

    private int pronunciationScore;

    private double happy;

    private double neutral;

    private double sad;

    private double disgust;

    private double surprise;

    private double fear;

    private double angry;

    @Builder
    private InterviewResult(Report report, String question, String answer, String feedback, int pronunciationScore,
                            double happy, double neutral, double sad, double disgust, double surprise, double fear,
                            double angry) {
        this.report = report;
        this.question = question;
        this.answer = answer;
        this.feedback = feedback;
        this.pronunciationScore = pronunciationScore;
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
                                         String feedback,
                                         int pronunciationScore) {
        return InterviewResult.builder()
                .report(report)
                .question(interviewRedis.getQuestion())
                .answer(interviewRedis.getAnswer())
                .feedback(feedback)
                .pronunciationScore(pronunciationScore)
                .happy(interviewRedis.getHappy())
                .neutral(interviewRedis.getNeutral())
                .sad(interviewRedis.getSad())
                .disgust(interviewRedis.getDisgust())
                .surprise(interviewRedis.getSurprise())
                .fear(interviewRedis.getFear())
                .angry(interviewRedis.getAngry())
                .build();
    }
}
