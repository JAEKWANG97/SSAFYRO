package com.ssafy.ssafyro.domain.user;

import java.util.Optional;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    @NotNull
    Optional<User> findById(@NotNull Long id);
}
