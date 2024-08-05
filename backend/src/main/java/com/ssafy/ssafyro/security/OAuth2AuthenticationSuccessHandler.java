package com.ssafy.ssafyro.security;

import com.ssafy.ssafyro.api.service.user.UserService;
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.security.Jwt.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Value("${front.domain}")
    private String frontServerDomain;

    private final Jwt jwt;
    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        String username = getUsername(authentication);

        User user = userService.loginOAuth(username);
        sendToken(response, createJWT(user));
    }

    private String getUsername(Authentication authentication) {
        CustomOAuth2User principal = (CustomOAuth2User) authentication.getPrincipal();
        return principal.getName();
    }

    private String createJWT(User user) {
        return jwt.create(
                Claims.of(
                        user.getId(),
                        new String[]{Role.USER.value()}
                )
        );
    }

    private void sendToken(HttpServletResponse response, String token) throws IOException {
        response.setStatus(HttpServletResponse.SC_OK);
        response.setHeader("content-type", "application/json");
        response.sendRedirect(frontServerDomain + "?token=" + token);
    }
}
