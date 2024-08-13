package com.ssafy.ssafyro.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.ssafyro.api.controller.codingtestproblem.request.CodingTestProblemScrapRequest;
import com.ssafy.ssafyro.api.service.codingtestproblem.response.CodingTestProblemResponse;
import com.ssafy.ssafyro.api.service.codingtestproblem.response.CodingTestProblemScrapResponse;
import com.ssafy.ssafyro.api.service.codingtestproblem.response.CodingTestProblemsResponse;
import com.ssafy.ssafyro.domain.codingtestproblem.CodingTestProblem;
import com.ssafy.ssafyro.domain.codingtestproblem.Difficulty;
import com.ssafy.ssafyro.security.WithMockJwtAuthentication;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

public class CodingTestProblemControllerDocsTest extends RestDocsSupport {

    private final CodingTestProblem problem1 = mock(CodingTestProblem.class);
    private final CodingTestProblem problem2 = mock(CodingTestProblem.class);

    @DisplayName("SW 적성 진단 테스트 문제 목록 조회 API")
    @Test
    void getProblems() throws Exception {
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

        CodingTestProblemsResponse response = new CodingTestProblemsResponse(List.of(problem1, problem2));

        given(codingTestProblemService.getProblems(any(Pageable.class)))
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
                                        fieldWithPath("response.problemInfos[].correctRate").type(JsonFieldType.NUMBER)
                                                .description("문제 정답률"),
                                        fieldWithPath("response.problemInfos[].recommendationCount").type(JsonFieldType.NUMBER)
                                                .description("문제 추천수"),
                                        fieldWithPath("response.problemInfos[].problemUrl").type(JsonFieldType.STRING)
                                                .description("문제 URL"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }

    @DisplayName("유저 별 스크랩한 SW 적성 진단 테스트 문제 목록 조회 API")
    @Test
    @WithMockJwtAuthentication
    void getScrapedProblemsByUserId() throws Exception {
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

        CodingTestProblemsResponse response = new CodingTestProblemsResponse(List.of(problem1, problem2));

        given(codingTestProblemService.getScrapedProblemsBy(any(Long.class), any(Pageable.class)))
                .willReturn(response);

        mockMvc.perform(
                        get("/api/v1/coding-test-problems/scrap")
                                .header("Authorization", "Bearer {JWT Token}")
                                .queryParam("page", "0")
                                .queryParam("size", "10")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-scraped-problems-by-user-id",
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
                                        fieldWithPath("response.problemInfos[].correctRate").type(JsonFieldType.NUMBER)
                                                .description("문제 정답률"),
                                        fieldWithPath("response.problemInfos[].recommendationCount").type(JsonFieldType.NUMBER)
                                                .description("문제 추천수"),
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
    void getProblemById() throws Exception {
        given(problem1.getId()).willReturn(1L);
        given(problem1.getTitle()).willReturn("문제1 제목");
        given(problem1.getDifficulty()).willReturn(Difficulty.D1);
        given(problem1.getCorrectRate()).willReturn(100.0);
        given(problem1.getProblemUrl()).willReturn("https://example1.com");

        CodingTestProblemResponse response = new CodingTestProblemResponse(problem1);

        given(codingTestProblemService.getProblem(any(Long.class)))
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

    @DisplayName("SW 적성 진단 테스트 문제 스크랩 생성 API")
    @Test
    @WithMockJwtAuthentication
    void createScrapedProblemsBy() throws Exception {
        CodingTestProblemScrapRequest request = new CodingTestProblemScrapRequest(1L);
        CodingTestProblemScrapResponse response = new CodingTestProblemScrapResponse(1L, 1L);

        given(codingTestProblemService.createScrap(any(Long.class), any(Long.class)))
                .willReturn(response);

        mockMvc.perform(
                        post("/api/v1/coding-test-problems/scrap")
                                .header("Authorization", "Bearer {JWT Token}")
                                .content(objectMapper.writeValueAsString(request))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("problem-scrap-save",
                                preprocessResponse(prettyPrint()),
                                requestFields(
                                        fieldWithPath("problemId").type(JsonFieldType.NUMBER)
                                                .description("문제 id")
                                ),
                                responseFields(
                                        fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                                .description("성공 여부"),
                                        fieldWithPath("response").type(JsonFieldType.OBJECT)
                                                .description("응답"),
                                        fieldWithPath("response.problemScrapId").type(JsonFieldType.NUMBER)
                                                .description("스크랩 id"),
                                        fieldWithPath("response.userId").type(JsonFieldType.NUMBER)
                                                .description("유저 id"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }
}
