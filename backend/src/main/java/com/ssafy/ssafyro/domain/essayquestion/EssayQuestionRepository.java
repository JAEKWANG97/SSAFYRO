package com.ssafy.ssafyro.domain.essayquestion;

import com.ssafy.ssafyro.domain.MajorType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EssayQuestionRepository extends JpaRepository<EssayQuestion, Long> {

    Optional<EssayQuestion> findByMajorTypeAndGeneration(MajorType majorType, Integer generation);
}
