package com.ssafy.ssafyro.domain.tag;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class QuestionTag {

    @Id
    private String tagName;

    @Builder
    private QuestionTag(String tagName) {
        this.tagName = tagName;
    }

    public static List<QuestionTag> create(List<String> nouns) {
        return nouns.stream()
                .map(noun -> QuestionTag.builder().tagName(noun).build())
                .toList();
    }
}
