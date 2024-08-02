package com.ssafy.ssafyro.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
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
import com.ssafy.ssafyro.api.service.codingtestproblem.CodingTestProblemService;
import com.ssafy.ssafyro.api.service.codingtestproblem.response.CodingTestProblemDetailResponse;
import com.ssafy.ssafyro.api.service.codingtestproblem.response.CodingTestProblemListResponse;
import com.ssafy.ssafyro.domain.codingtestproblem.CodingTestProblem;
import com.ssafy.ssafyro.domain.codingtestproblem.Difficulty;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

public class CodingTestProblemControllerDocsTest extends RestDocsSupport {

    private final CodingTestProblemService codingTestProblemService = mock(CodingTestProblemService.class);

    private final CodingTestProblem problem1 = mock(CodingTestProblem.class);
    private final CodingTestProblem problem2 = mock(CodingTestProblem.class);

    @Override
    protected Object initController() {
        return new CodingTestProblemController(codingTestProblemService);
    }

    @DisplayName("SW 적성 진단 테스트 문제 목록 조회 API")
    @Test
    void findAll() throws Exception {
        given(problem1.getId()).willReturn(1L);
        given(problem1.getTitle()).willReturn("문제1 제목");
        given(problem1.getDifficulty()).willReturn(Difficulty.D1);
        given(problem1.getCorrectRate()).willReturn(100.0);
        given(problem1.getProblemUrl()).willReturn("https://example1.com");

        given(problem2.getId()).willReturn(2L);
        given(problem2.getTitle()).willReturn("문제2 제목");
        given(problem2.getDifficulty()).willReturn(Difficulty.D2);
        given(problem2.getCorrectRate()).willReturn(100.0);
        given(problem2.getProblemUrl()).willReturn("https://example2.com");

        CodingTestProblemListResponse response = new CodingTestProblemListResponse(List.of(problem1, problem2));

        given(codingTestProblemService.findAll(any(Pageable.class)))
                .willReturn(response);

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
                                        fieldWithPath("response.problemInfos[].id").type(JsonFieldType.NUMBER)
                                                .description("문제 ID"),
                                        fieldWithPath("response.problemInfos[].title").type(JsonFieldType.STRING)
                                                .description("문제 제목"),
                                        fieldWithPath("response.problemInfos[].difficulty").type(JsonFieldType.STRING)
                                                .description("문제 난이도"),
                                        fieldWithPath("response.problemInfos[].problemUrl").type(JsonFieldType.STRING)
                                                .description("문제 URL"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }

    @DisplayName("SW 적성 진단 테스트 문제 상세 조회 API")
    @Test
    void findById() throws Exception {
        given(problem1.getId()).willReturn(1L);
        given(problem1.getTitle()).willReturn("문제1 제목");
        given(problem1.getDifficulty()).willReturn(Difficulty.D1);
        given(problem1.getCorrectRate()).willReturn(100.0);
        given(problem1.getProblemUrl()).willReturn("https://example1.com");

        CodingTestProblemDetailResponse response = new CodingTestProblemDetailResponse(problem1);

        given(codingTestProblemService.findById(any(Long.class)))
                .willReturn(response);

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
