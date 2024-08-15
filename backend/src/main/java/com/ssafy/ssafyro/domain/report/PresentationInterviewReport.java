package com.ssafy.ssafyro.domain.report;

import com.ssafy.ssafyro.domain.article.Article;
import com.ssafy.ssafyro.domain.room.entity.Room;
import com.ssafy.ssafyro.domain.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PresentationInterviewReport extends Report {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @Builder
    private PresentationInterviewReport(User user, Room room, int totalScore, int pronunciationScore, Article article) {
        super(user, room, totalScore, pronunciationScore);
        this.article = article;
    }
}
