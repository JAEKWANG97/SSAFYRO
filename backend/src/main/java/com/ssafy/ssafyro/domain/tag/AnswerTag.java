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
public class AnswerTag {

    @Id
    private String tagName;

    @Builder
    private AnswerTag(String tagName) {
        this.tagName = tagName;
    }

    public static List<AnswerTag> create(List<String> nouns) {
        return nouns.stream()
                .map(noun -> AnswerTag.builder().tagName(noun).build())
                .toList();
    }
}
