package com.ssafy.ssafyro.domain.codingtestproblem;

import com.ssafy.ssafyro.domain.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class CodingTestProblem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private Difficulty difficulty;

    private double correctRate;

    private int recommendationCount;

    private String problemUrl;

    @Builder
    private CodingTestProblem(String title, Difficulty difficulty, double correctRate, int recommendationCount,
                              String problemUrl) {
        this.title = title;
        this.difficulty = difficulty;
        this.correctRate = correctRate;
        this.recommendationCount = recommendationCount;
        this.problemUrl = problemUrl;
    }
}
