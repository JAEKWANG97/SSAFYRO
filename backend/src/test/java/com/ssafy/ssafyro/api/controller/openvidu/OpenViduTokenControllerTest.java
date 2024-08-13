package com.ssafy.ssafyro.api.controller.openvidu;

import static org.hamcrest.Matchers.is;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.handler;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.ssafyro.api.controller.ControllerTestSupport;
import com.ssafy.ssafyro.api.controller.openvidu.request.TokenRequest;
import com.ssafy.ssafyro.security.WithMockJwtAuthentication;
import java.util.UUID;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

class OpenViduTokenControllerTest extends ControllerTestSupport {

    @DisplayName("회의 방 id와 유저 닉네임을 활용해 openVidu 토큰을 생성한다.")
    @Test
    @WithMockJwtAuthentication
    void createTokenTest() throws Exception {
        TokenRequest tokenRequest = new TokenRequest(generateRandomRoomId(), "김두열");

        ResultActions result = mockMvc.perform(
                post("/api/v1/openvidu/token")
                        .content(objectMapper.writeValueAsString(tokenRequest))
                        .contentType(MediaType.APPLICATION_JSON)
        );

        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(OpenViduTokenController.class))
                .andExpect(handler().methodName("createToken"))
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.response.token").exists())
                .andExpect(jsonPath("$.error").isEmpty());
    }

    @DisplayName("openVidu 토큰을 생성할 때 회의 방 id가 누락되면 400 에러가 반환된다.")
    @Test
    @WithMockJwtAuthentication
    void createTokenWithoutRoomIdTest() throws Exception {
        TokenRequest tokenRequest = new TokenRequest(null, "김두열");

        ResultActions result = mockMvc.perform(
                post("/api/v1/openvidu/token")
                        .content(objectMapper.writeValueAsString(tokenRequest))
                        .contentType(MediaType.APPLICATION_JSON)
        );

        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(handler().handlerType(OpenViduTokenController.class))
                .andExpect(handler().methodName("createToken"))
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.response").isEmpty())
                .andExpect(jsonPath("$.error").exists());
    }

    @DisplayName("openVidu 토큰을 생성할 때 유저 닉네임이 누락되면 400 에러가 반환된다.")
    @Test
    @WithMockJwtAuthentication
    void createTokenWithoutParticipantNameTest() throws Exception {
        TokenRequest tokenRequest = new TokenRequest(generateRandomRoomId(), null);

        ResultActions result = mockMvc.perform(
                post("/api/v1/openvidu/token")
                        .content(objectMapper.writeValueAsString(tokenRequest))
                        .contentType(MediaType.APPLICATION_JSON)
        );

        result.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(handler().handlerType(OpenViduTokenController.class))
                .andExpect(handler().methodName("createToken"))
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.response").isEmpty())
                .andExpect(jsonPath("$.error").exists());
    }

    private String generateRandomRoomId() {
        return UUID.randomUUID().toString();
    }
}