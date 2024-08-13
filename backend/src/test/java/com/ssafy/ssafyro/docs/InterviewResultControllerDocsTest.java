package com.ssafy.ssafyro.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.ssafyro.api.service.interviewresult.response.InterviewResultsResponse;
import com.ssafy.ssafyro.domain.interview.InterviewRedis;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResultDocument;
import com.ssafy.ssafyro.security.WithMockJwtAuthentication;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

public class InterviewResultControllerDocsTest extends RestDocsSupport {

    @DisplayName("유저 맞춤 베스트 질문 답변 조회 API")
    @Test
    @WithMockJwtAuthentication
    void getBestInterviewResults() throws Exception {
        given(koMorAnGenerator.createTags(any(String.class)))
                .willReturn(List.of("태그1", "태그2"));

        InterviewResultsResponse response = InterviewResultsResponse.of(
                List.of(createInterviewResultDocument(1L, "질문", "답변", 100))
        );

        given(interviewResultService.getRecommendInterviewResultsFor(any(Long.class), any(Pageable.class)))
                .willReturn(response);

        mockMvc.perform(
                        get("/api/v1/interview-result/best")
                                .header("Authorization", "Bearer {JWT Token}")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-best-interview-result",
                                preprocessResponse(prettyPrint()),
                                responseFields(
                                        fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                                .description("성공 여부"),
                                        fieldWithPath("response").type(JsonFieldType.OBJECT)
                                                .description("응답"),
                                        fieldWithPath("response.interviewResultInfos").type(JsonFieldType.ARRAY)
                                                .description("베스트 질문, 답변"),
                                        fieldWithPath("response.interviewResultInfos[].interviewResultId").type(
                                                        JsonFieldType.STRING)
                                                .description("인터뷰 결과 id"),
                                        fieldWithPath("response.interviewResultInfos[].question").type(JsonFieldType.STRING)
                                                .description("질문"),
                                        fieldWithPath("response.interviewResultInfos[].answer").type(JsonFieldType.STRING)
                                                .description("답변"),
                                        fieldWithPath("response.interviewResultInfos[].expressions").type(JsonFieldType.OBJECT)
                                                .description("표정 점수"),
                                        fieldWithPath("response.interviewResultInfos[].expressions.HAPPY").type(
                                                        JsonFieldType.NUMBER)
                                                .description("표정1"),
                                        fieldWithPath("response.interviewResultInfos[].expressions.DISGUST").type(
                                                        JsonFieldType.NUMBER)
                                                .description("표정2"),
                                        fieldWithPath("response.interviewResultInfos[].expressions.SAD").type(
                                                        JsonFieldType.NUMBER)
                                                .description("표정3"),
                                        fieldWithPath("response.interviewResultInfos[].createdDate").type(JsonFieldType.STRING)
                                                .description("생성 날짜"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }

    @DisplayName("유저 별 인터뷰 결과 목록 조회 API")
    @Test
    @WithMockJwtAuthentication
    void getInterviewResultsByUserId() throws Exception {
        given(koMorAnGenerator.createTags(any(String.class)))
                .willReturn(List.of("태그1", "태그2"));

        InterviewResultsResponse response = InterviewResultsResponse.of(
                List.of(createInterviewResultDocument(1L, "질문", "답변", 100))
        );

        given(interviewResultService.getInterviewResultsBy(any(Long.class), any(Pageable.class)))
                .willReturn(response);

        mockMvc.perform(
                        get("/api/v1/interview-result")
                                .header("Authorization", "Bearer {JWT Token}")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-interview-result-by-user-id",
                                preprocessResponse(prettyPrint()),
                                responseFields(
                                        fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                                .description("성공 여부"),
                                        fieldWithPath("response").type(JsonFieldType.OBJECT)
                                                .description("응답"),
                                        fieldWithPath("response.interviewResultInfos").type(JsonFieldType.ARRAY)
                                                .description("베스트 질문, 답변"),
                                        fieldWithPath("response.interviewResultInfos[].interviewResultId").type(
                                                        JsonFieldType.STRING)
                                                .description("인터뷰 결과 id"),
                                        fieldWithPath("response.interviewResultInfos[].question").type(JsonFieldType.STRING)
                                                .description("질문"),
                                        fieldWithPath("response.interviewResultInfos[].answer").type(JsonFieldType.STRING)
                                                .description("답변"),
                                        fieldWithPath("response.interviewResultInfos[].expressions").type(JsonFieldType.OBJECT)
                                                .description("표정 점수"),
                                        fieldWithPath("response.interviewResultInfos[].expressions.HAPPY").type(
                                                        JsonFieldType.NUMBER)
                                                .description("표정1"),
                                        fieldWithPath("response.interviewResultInfos[].expressions.DISGUST").type(
                                                        JsonFieldType.NUMBER)
                                                .description("표정2"),
                                        fieldWithPath("response.interviewResultInfos[].expressions.SAD").type(
                                                        JsonFieldType.NUMBER)
                                                .description("표정3"),
                                        fieldWithPath("response.interviewResultInfos[].createdDate").type(JsonFieldType.STRING)
                                                .description("생성 날짜"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }

    private InterviewResultDocument createInterviewResultDocument(Long userId,
                                                                  String question,
                                                                  String answer,
                                                                  int score) {
        return InterviewResultDocument.create(
                createInterview(userId, question, answer, score), koMorAnGenerator
        );
    }

    private InterviewRedis createInterview(Long userId, String question, String answer, int score) {
        return InterviewRedis.builder()
                .userId(userId)
                .question(question)
                .answer(answer)
                .pronunciationScore(100)
                .evaluationScore(score)
                .happy(97)
                .disgust(2)
                .sad(1)
                .surprise(0)
                .fear(0)
                .angry(0)
                .neutral(0)
                .build();
    }
}
