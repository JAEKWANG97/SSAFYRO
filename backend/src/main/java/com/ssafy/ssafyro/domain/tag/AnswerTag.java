package com.ssafy.ssafyro.domain.tag;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
}
