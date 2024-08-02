package com.ssafy.ssafyro.domain.essay;

import com.ssafy.ssafyro.domain.user.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EssayRepository extends JpaRepository<Essay, Long> {

    Optional<Essay> findByUser(User user);
}
