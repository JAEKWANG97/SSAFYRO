package com.ssafy.ssafyro.domain.itknowledge;

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
public class ItKnowledge extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String thumbnailImageUrl;
    private String articleUrl;

    @Builder
    private ItKnowledge(String title, String thumbnailImageUrl, String articleUrl) {
        this.title = title;
        this.thumbnailImageUrl = thumbnailImageUrl;
        this.articleUrl = articleUrl;
    }
}
