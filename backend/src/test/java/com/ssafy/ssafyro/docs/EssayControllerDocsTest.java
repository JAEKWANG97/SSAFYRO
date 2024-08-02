package com.ssafy.ssafyro.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.ssafyro.api.controller.essay.EssayController;
import com.ssafy.ssafyro.api.controller.essay.request.EssayReviewRequest;
import com.ssafy.ssafyro.api.controller.essay.request.EssaySaveRequest;
import com.ssafy.ssafyro.api.service.essay.EssayService;
import com.ssafy.ssafyro.api.service.essay.request.EssayReviewServiceRequest;
import com.ssafy.ssafyro.api.service.essay.request.EssaySaveServiceRequest;
import com.ssafy.ssafyro.api.service.essay.response.EssayDetailResponse;
import com.ssafy.ssafyro.api.service.essay.response.EssayReviewResponse;
import com.ssafy.ssafyro.api.service.essay.response.EssaySaveResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

public class EssayControllerDocsTest extends RestDocsSupport {

    private final EssayService essayService = mock(EssayService.class);

    @Override
    protected Object initController() {
        return new EssayController(essayService);
    }

    @DisplayName("에세이 첨삭 API")
    @Test
    void reviewEssay() throws Exception {
        EssayReviewRequest essayReviewRequest = new EssayReviewRequest(1L, "첨삭 전 에세이");

        given(essayService.reviewEssay(any(EssayReviewServiceRequest.class)))
                .willReturn(new EssayReviewResponse("첨삭 후 에세이"));

        mockMvc.perform(
                        post("/api/v1/essays/review")
                                .content(objectMapper.writeValueAsString(essayReviewRequest))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("essay-review",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestFields(
                                        fieldWithPath("essayQuestionId").type(JsonFieldType.NUMBER)
                                                .description("에세이 질문 id"),
                                        fieldWithPath("content").type(JsonFieldType.STRING)
                                                .description("첨삭 전 에세이")
                                ),
                                responseFields(
                                        fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                                .description("성공 여부"),
                                        fieldWithPath("response").type(JsonFieldType.OBJECT)
                                                .description("응답"),
                                        fieldWithPath("response.content").type(JsonFieldType.STRING)
                                                .description("첨삭 후 에세이"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }

    @DisplayName("에세이 저장 API")
    @Test
    void save() throws Exception {
        EssaySaveRequest essaySaveRequest = new EssaySaveRequest(1L, 1L, "에세이");

        given(essayService.save(any(EssaySaveServiceRequest.class)))
                .willReturn(new EssaySaveResponse(1L));

        mockMvc.perform(
                        post("/api/v1/essays")
                                .content(objectMapper.writeValueAsString(essaySaveRequest))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("essay-save",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestFields(
                                        fieldWithPath("userId").type(JsonFieldType.NUMBER)
                                                .description("유저 id"),
                                        fieldWithPath("essayQuestionId").type(JsonFieldType.NUMBER)
                                                .description("에세이 질문 id"),
                                        fieldWithPath("content").type(JsonFieldType.STRING)
                                                .description("에세이")
                                ),
                                responseFields(
                                        fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                                .description("성공 여부"),
                                        fieldWithPath("response").type(JsonFieldType.OBJECT)
                                                .description("응답"),
                                        fieldWithPath("response.essayId").type(JsonFieldType.NUMBER)
                                                .description("에세이 id"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }

    @DisplayName("에세이 상세 조회 API")
    @Test
    void findEssay() throws Exception {
        given(essayService.findBy(any(Long.class)))
                .willReturn(new EssayDetailResponse(1L, "에세이"));

        mockMvc.perform(
                        get("/api/v1/essays")
                                .queryParam("userId", "1")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-essay-by-user-id",
                                preprocessResponse(prettyPrint()),
                                queryParameters(
                                        parameterWithName("userId").description("유저 id")
                                ),
                                responseFields(
                                        fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                                .description("성공 여부"),
                                        fieldWithPath("response").type(JsonFieldType.OBJECT)
                                                .description("응답"),
                                        fieldWithPath("response.userId").type(JsonFieldType.NUMBER)
                                                .description("유저 id"),
                                        fieldWithPath("response.content").type(JsonFieldType.STRING)
                                                .description("에세이 내용"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }
}
