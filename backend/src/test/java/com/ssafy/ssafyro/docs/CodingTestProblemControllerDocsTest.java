package com.ssafy.ssafyro.docs;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.ssafyro.api.controller.codingtestproblem.CodingTestProblemController;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

public class CodingTestProblemControllerDocsTest extends RestDocsSupport {

    @Override
    protected Object initController() {
        return new CodingTestProblemController();
    }

    @DisplayName("SW 적성 진단 테스트 문제 목록 조회 API")
    @Test
    void findAll() throws Exception {
        mockMvc.perform(
                        get("/api/v1/coding-test-problems")
                                .queryParam("page", "0")
                                .queryParam("size", "10")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-problems",
                                preprocessResponse(prettyPrint()),
                                queryParameters(
                                        parameterWithName("page").description("페이지 번호"),
                                        parameterWithName("size").description("페이지 크기")
                                ),
                                responseFields(
                                        fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                                .description("성공 여부"),
                                        fieldWithPath("response").type(JsonFieldType.OBJECT)
                                                .description("응답"),
                                        fieldWithPath("response.problemInfos").type(JsonFieldType.ARRAY)
                                                .description("문제 정보 리스트"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }

    @DisplayName("SW 적성 진단 테스트 문제 상세 조회 API")
    @Test
    void findById() throws Exception {
        mockMvc.perform(
                        get("/api/v1/coding-test-problems/{id}", 1)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-problem-by-id",
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("id").description("문제 id")
                                ),
                                responseFields(
                                        fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                                .description("성공 여부"),
                                        fieldWithPath("response").type(JsonFieldType.OBJECT)
                                                .description("응답"),
                                        fieldWithPath("response.id").type(JsonFieldType.NUMBER)
                                                .description("문제 id"),
                                        fieldWithPath("response.title").type(JsonFieldType.STRING)
                                                .description("문제 제목"),
                                        fieldWithPath("response.difficulty").type(JsonFieldType.STRING)
                                                .description("문제 난이도"),
                                        fieldWithPath("response.correctRate").type(JsonFieldType.NUMBER)
                                                .description("문제 난이도"),
                                        fieldWithPath("response.recommendationCount").type(JsonFieldType.NUMBER)
                                                .description("문제 추천 수"),
                                        fieldWithPath("response.problemUrl").type(JsonFieldType.STRING)
                                                .description("문제 url"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }
}
