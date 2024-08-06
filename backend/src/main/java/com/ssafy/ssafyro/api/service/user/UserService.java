package com.ssafy.ssafyro.api.service.user;

import com.ssafy.ssafyro.api.service.user.response.UserInitSettingResponse;
import com.ssafy.ssafyro.domain.MajorType;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.domain.user.UserRepository;
import com.ssafy.ssafyro.error.user.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    public User loginOAuth(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

    @Transactional
    public UserInitSettingResponse initMajorTypeFor(Long userId, MajorType majorType) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        user.initializeMajorType(majorType);

        return UserInitSettingResponse.of(user.getId(), user.getMajorType());
    }
}
