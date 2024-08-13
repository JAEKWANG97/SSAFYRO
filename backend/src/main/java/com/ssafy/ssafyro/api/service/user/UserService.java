package com.ssafy.ssafyro.api.service.user;

import com.ssafy.ssafyro.api.service.user.response.UserInfoResponse;
import com.ssafy.ssafyro.api.service.user.response.UserInitSettingResponse;
import com.ssafy.ssafyro.domain.MajorType;
import com.ssafy.ssafyro.domain.report.ReportRepository;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.domain.user.UserRepository;
import com.ssafy.ssafyro.error.user.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final ReportRepository reportRepository;

    public User loginOAuth(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

    public UserInitSettingResponse initMajorTypeFor(Long userId, MajorType majorType) {
        User user = getUser(userId);

        user.initializeMajorType(majorType);

        return UserInitSettingResponse.of(user.getId(), user.getMajorType());
    }

    public UserInfoResponse getUserInfo(Long userId) {
        User user = getUser(userId);

        return UserInfoResponse.of(
                user,
                reportRepository.countReportsType(RoomType.PERSONALITY, user),
                reportRepository.countReportsType(RoomType.PRESENTATION, user)
        );
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }
}
