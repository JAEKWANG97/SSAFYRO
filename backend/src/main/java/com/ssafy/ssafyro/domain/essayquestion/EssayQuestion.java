package com.ssafy.ssafyro.domain.essayquestion;

import com.ssafy.ssafyro.domain.BaseEntity;
import com.ssafy.ssafyro.domain.MajorType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
public class EssayQuestion extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int generation;

    @Enumerated(EnumType.STRING)
    private MajorType majorType;

    private String content;

    private int characterLimit;

    @Builder
    private EssayQuestion(int generation, MajorType majorType, String content, int characterLimit) {
        this.generation = generation;
        this.majorType = majorType;
        this.content = content;
        this.characterLimit = characterLimit;
    }
}
