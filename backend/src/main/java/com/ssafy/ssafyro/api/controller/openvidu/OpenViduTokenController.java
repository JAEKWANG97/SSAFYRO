package com.ssafy.ssafyro.api.controller.openvidu;

import static com.ssafy.ssafyro.api.ApiUtils.success;

import com.ssafy.ssafyro.api.ApiUtils.ApiResult;
import com.ssafy.ssafyro.api.controller.openvidu.dto.TokenRequest;
import com.ssafy.ssafyro.api.controller.openvidu.dto.TokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class OpenViduTokenController {

    private final OpenViduTokenFactory tokenFactory;

    @PostMapping("/api/v1/openvidu/token")
    public ApiResult<TokenResponse> createToken(@RequestBody TokenRequest request) {
        return success(
                new TokenResponse(tokenFactory.createTokenBy(request.roomName(), request.participantName()))
        );
    }
}
