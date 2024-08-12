package com.ssafy.ssafyro.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.ssafyro.api.controller.user.request.UserInitSettingRequest;
import com.ssafy.ssafyro.api.service.user.UserService;
import com.ssafy.ssafyro.api.service.user.response.UserInfoResponse;
import com.ssafy.ssafyro.api.service.user.response.UserInitSettingResponse;
import com.ssafy.ssafyro.domain.MajorType;
import com.ssafy.ssafyro.security.WithMockJwtAuthentication;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

public class UserControllerDocsTest extends RestDocsSupport {

    @MockBean
    private UserService userService;

    @DisplayName("첫 로그인 시 전공 여부 설정 API")
    @Test
    @WithMockJwtAuthentication
    void initMajorType() throws Exception {
        UserInitSettingRequest request = new UserInitSettingRequest(MajorType.MAJOR);

        UserInitSettingResponse response = new UserInitSettingResponse(1L, MajorType.MAJOR);

        given(userService.initMajorTypeFor(any(Long.class), any(MajorType.class)))
                .willReturn(response);

        mockMvc.perform(
                        post("/api/v1/users/init")
                                .content(objectMapper.writeValueAsString(request))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("user-init-major-type",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestFields(
                                        fieldWithPath("type").type(JsonFieldType.STRING)
                                                .description("전공 여부")
                                ),
                                responseFields(
                                        fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                                .description("성공 여부"),
                                        fieldWithPath("response").type(JsonFieldType.OBJECT)
                                                .description("응답"),
                                        fieldWithPath("response.userId").type(JsonFieldType.NUMBER)
                                                .description("응답"),
                                        fieldWithPath("response.type").type(JsonFieldType.STRING)
                                                .description("응답"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }

    @DisplayName("사용자 기본 정보 API")
    @Test
    @WithMockJwtAuthentication
    void getUserInfo() throws Exception {
        UserInfoResponse response = new UserInfoResponse(
                "이름",
                MajorType.MAJOR,
                "https://sample-image.png",
                3,
                5
        );

        given(userService.getUserInfo(any(Long.class))).willReturn(response);

        mockMvc.perform(
                        get("/api/v1/users")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("user-info",
                                preprocessResponse(prettyPrint()),
                                responseFields(
                                        fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                                .description("성공 여부"),
                                        fieldWithPath("response").type(JsonFieldType.OBJECT)
                                                .description("응답"),
                                        fieldWithPath("response.nickname").type(JsonFieldType.STRING)
                                                .description("사용자 이름"),
                                        fieldWithPath("response.type").type(JsonFieldType.STRING)
                                                .description("MAJOR/NON_MAJOR"),
                                        fieldWithPath("response.profileImageUrl").type(JsonFieldType.STRING)
                                                .description("이미지 url(임시)"),
                                        fieldWithPath("response.personalCount").type(JsonFieldType.NUMBER)
                                                .description("인성 모의 면접 횟수"),
                                        fieldWithPath("response.presentationCount").type(JsonFieldType.NUMBER)
                                                .description("PT 모의 면접 횟수"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );

    }
}
