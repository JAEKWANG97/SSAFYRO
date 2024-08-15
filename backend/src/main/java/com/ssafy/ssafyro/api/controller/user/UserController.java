package com.ssafy.ssafyro.api.controller.user;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.controller.user.request.UserInitSettingRequest;
import com.ssafy.ssafyro.api.service.user.UserService;
import com.ssafy.ssafyro.api.service.user.response.UserInfoResponse;
import com.ssafy.ssafyro.api.service.user.response.UserInitSettingResponse;
import com.ssafy.ssafyro.security.JwtAuthentication;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/api/v1/users/init")
    public ApiResult<UserInitSettingResponse> initMajorType(@AuthenticationPrincipal JwtAuthentication userInfo,
                                                            @Valid @RequestBody UserInitSettingRequest request) {
        return success(userService.initMajorTypeFor(userInfo.id(), request.type()));
    }

    @GetMapping("/api/v1/users")
    public ApiResult<UserInfoResponse> getUserInfo(@AuthenticationPrincipal JwtAuthentication userInfo) {
        return success(userService.getUserInfo(userInfo.id()));
    }
}
