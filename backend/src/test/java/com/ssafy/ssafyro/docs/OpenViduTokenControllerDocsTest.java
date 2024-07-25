package com.ssafy.ssafyro.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.ssafyro.api.controller.openvidu.OpenViduTokenController;
import com.ssafy.ssafyro.api.controller.openvidu.OpenViduTokenFactory;
import com.ssafy.ssafyro.api.controller.openvidu.dto.TokenRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

class OpenViduTokenControllerDocsTest extends RestDocsSupport {

    private final OpenViduTokenFactory tokenFactory = mock(OpenViduTokenFactory.class);

    @Override
    protected Object initController() {
        return new OpenViduTokenController(tokenFactory);
    }

    @DisplayName("openVidu 접속 token 발급 API")
    @Test
    void test() throws Exception {
        TokenRequest tokenRequest = new TokenRequest("room1", "user1");

        given(tokenFactory.createTokenBy(any(String.class), any(String.class)))
                .willReturn("JWT Token");

        mockMvc.perform(
                        post("/api/v1/openvidu/token")
                                .content(objectMapper.writeValueAsString(tokenRequest))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("openvidu-token-create",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("roomName").type(JsonFieldType.STRING)
                                        .description("방 이름"),
                                fieldWithPath("participantName").type(JsonFieldType.STRING)
                                        .description("참여자 이름")
                        ),
                        responseFields(
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                        .description("성공 여부"),
                                fieldWithPath("response").type(JsonFieldType.OBJECT)
                                        .description("응답"),
                                fieldWithPath("response.token").type(JsonFieldType.STRING)
                                        .description("토큰"),
                                fieldWithPath("error").type(JsonFieldType.NULL)
                                        .description("에러")
                        )
                ));
    }
}