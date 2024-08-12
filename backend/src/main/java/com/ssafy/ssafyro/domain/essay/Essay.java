package com.ssafy.ssafyro.domain.essay;

import com.ssafy.ssafyro.domain.BaseEntity;
import com.ssafy.ssafyro.domain.essayquestion.EssayQuestion;
import com.ssafy.ssafyro.domain.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Essay extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "essay_question_id")
    private EssayQuestion question;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Builder
    private Essay(User user, EssayQuestion question, String content) {
        this.user = user;
        this.question = question;
        this.content = content;
    }
}
