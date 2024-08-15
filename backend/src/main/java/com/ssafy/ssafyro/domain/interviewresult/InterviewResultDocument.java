package com.ssafy.ssafyro.domain.interviewresult;

import com.ssafy.ssafyro.api.service.report.Expression;
import com.ssafy.ssafyro.api.service.report.KoMorAnGenerator;
import com.ssafy.ssafyro.domain.interview.InterviewRedis;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(indexName = "interview-results")
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

    @Field(type = FieldType.Date, format = DateFormat.date_hour_minute_second_millis)
    private LocalDateTime createdDate;

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
        this.createdDate = LocalDateTime.now();
    }

    //TODO: Elasticsearch Test 전용 생성자, 추후 삭제 예정
    public InterviewResultDocument(InterviewResult interviewResult,
                                   List<String> questionTags,
                                   List<String> answerTags) {
        this.id = UUID.randomUUID().toString();
        this.userId = interviewResult.getUserId();
        this.question = interviewResult.getQuestion();
        this.answer = interviewResult.getAnswer();
        this.pronunciationScore = interviewResult.getPronunciationScore();
        this.evaluationScore = interviewResult.getEvaluationScore();
        this.happy = interviewResult.getHappy();
        this.neutral = interviewResult.getNeutral();
        this.sad = interviewResult.getSad();
        this.disgust = interviewResult.getDisgust();
        this.surprise = interviewResult.getSurprise();
        this.fear = interviewResult.getFear();
        this.angry = interviewResult.getAngry();
        this.questionTags = questionTags;
        this.answerTags = answerTags;
        this.createdDate = LocalDateTime.now();
    }

    public static InterviewResultDocument create(InterviewRedis interviewRedis,
                                                 KoMorAnGenerator generator) {
        List<String> questionTags = generator.createTags(interviewRedis.getQuestion());
        List<String> answerTags = generator.createTags(interviewRedis.getAnswer());

        return new InterviewResultDocument(interviewRedis, questionTags, answerTags);
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
}
