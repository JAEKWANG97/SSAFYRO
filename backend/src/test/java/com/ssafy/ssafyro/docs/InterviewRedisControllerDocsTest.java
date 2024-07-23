package com.ssafy.ssafyro.docs;

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

import com.ssafy.ssafyro.api.controller.interview.InterviewRedisController;
import com.ssafy.ssafyro.api.controller.interview.dto.QuestionResultRequest;
import com.ssafy.ssafyro.api.service.interview.InterviewRedisService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

public class InterviewRedisControllerDocsTest extends RestDocsSupport {

    private final InterviewRedisService interviewRedisService = Mockito.mock(InterviewRedisService.class);

    @Override
    protected Object initController() {
        return new InterviewRedisController(interviewRedisService);
    }

    @DisplayName("면접 질문, 답변 저장 API")
    @Test
    void saveQuestionResult() throws Exception {
        QuestionResultRequest request = QuestionResultRequest.builder()
                .roomId("roomId")
                .userId("userId")
                .question("자신의 강점이 뭐라고 생각하시나요?")
                .answer("포기할 줄 모르는 자세입니다.")
                .pronunciation_score(3)
                .happy(0.9)
                .disgust(0.01)
                .sad(0.01)
                .surprise(0.01)
                .fear(0.01)
                .angry(0.01)
                .neutral(0.01)
                .build();

        mockMvc.perform(
                        post("/api/v1/interview/question-result")
                                .content(objectMapper.writeValueAsString(request))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("interview-question-answer-save",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("roomId").type(JsonFieldType.STRING)
                                        .description("방 고유 Id"),
                                fieldWithPath("userId").type(JsonFieldType.STRING)
                                        .description("면접자 고유 Id"),
                                fieldWithPath("question").type(JsonFieldType.STRING)
                                        .description("면접 질문"),
                                fieldWithPath("answer").type(JsonFieldType.STRING)
                                        .description("면접 답변"),
                                fieldWithPath("pronunciation_score").type(JsonFieldType.NUMBER)
                                        .description("발음 점수"),
                                fieldWithPath("happy").type(JsonFieldType.NUMBER)
                                        .description("행복 점수"),
                                fieldWithPath("disgust").type(JsonFieldType.NUMBER)
                                        .description("역겨움 점수"),
                                fieldWithPath("sad").type(JsonFieldType.NUMBER)
                                        .description("슬픔 점수"),
                                fieldWithPath("surprise").type(JsonFieldType.NUMBER)
                                        .description("놀람 점수"),
                                fieldWithPath("fear").type(JsonFieldType.NUMBER)
                                        .description("두려움 점수"),
                                fieldWithPath("angry").type(JsonFieldType.NUMBER)
                                        .description("화남 점수"),
                                fieldWithPath("neutral").type(JsonFieldType.NUMBER)
                                        .description("무표정 점수")
                        ),
                        responseFields(
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                        .description("성공 여부"),
                                fieldWithPath("response").type(JsonFieldType.NULL)
                                        .description("응답"),
                                fieldWithPath("error").type(JsonFieldType.NULL)
                                        .description("에러")
                        )
                ));
    }
}
