package com.ssafy.ssafyro.domain.article;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String content;

    private String question1;

    private String question2;

    @Builder
    private Article(String title, String content, List<String> questions) {
        this.title = title;
        this.content = content;
        this.question1 = questions.get(0);
        this.question2 = questions.get(1);
    }
}
