package com.ssafy.ssafyro.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
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

import com.ssafy.ssafyro.api.controller.interview.InterviewController;
import com.ssafy.ssafyro.api.controller.interview.dto.QuestionAnswerRequest;
import com.ssafy.ssafyro.api.controller.interview.dto.StartRequest;
import com.ssafy.ssafyro.api.service.interview.InterviewService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

public class InterviewControllerDocsTest extends RestDocsSupport {

    private final InterviewService interviewService = Mockito.mock(InterviewService.class);

    @Override
    protected Object initController() {
        return new InterviewController(interviewService);
    }

    @DisplayName("면접시작 API")
    @Test
    void startInterview() throws Exception {
        StartRequest startRequest = new StartRequest("roomId");

        given(interviewService.startInterview(any()))
                .willReturn("모집완료");

        mockMvc.perform(
                        post("/api/v1/interview/start")
                                .content(objectMapper.writeValueAsString(startRequest))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("interview-start",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("roomId").type(JsonFieldType.STRING)
                                        .description("방 고유 아이디")
                        ),
                        responseFields(
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                        .description("성공 여부"),
                                fieldWithPath("response").type(JsonFieldType.OBJECT)
                                        .description("응답"),
                                fieldWithPath("response.recruitStatus").type(JsonFieldType.STRING)
                                        .description("수정된 현재상태"),
                                fieldWithPath("error").type(JsonFieldType.NULL)
                                        .description("에러")
                        )
                ));
    }

    @DisplayName("면접 질문, 답변 저장 API")
    @Test
    void saveQuestionAnswer() throws Exception {
        QuestionAnswerRequest request = new QuestionAnswerRequest("자신의 강점이 뭐라고 생각하시나요?", "포기할 줄 모르는 자세입니다.");

        mockMvc.perform(
                        post("/api/v1/interview/question-answer")
                                .content(objectMapper.writeValueAsString(request))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("interview-question-answer-save",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("question").type(JsonFieldType.STRING)
                                        .description("면접 질문"),
                                fieldWithPath("answer").type(JsonFieldType.STRING)
                                        .description("면접 답변")
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
