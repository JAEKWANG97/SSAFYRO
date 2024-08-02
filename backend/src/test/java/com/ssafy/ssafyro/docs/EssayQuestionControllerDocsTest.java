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
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.ssafyro.api.controller.essayquestion.EssayQuestionController;
import com.ssafy.ssafyro.api.service.essayquestion.EssayQuestionService;
import com.ssafy.ssafyro.api.service.essayquestion.request.EssayQuestionDetailServiceRequest;
import com.ssafy.ssafyro.api.service.essayquestion.response.EssayQuestionDetailResponse;
import com.ssafy.ssafyro.domain.MajorType;
import com.ssafy.ssafyro.domain.essayquestion.EssayQuestion;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

public class EssayQuestionControllerDocsTest extends RestDocsSupport {

    private final EssayQuestionService essayQuestionService = mock(EssayQuestionService.class);

    private final EssayQuestion essayQuestion = mock(EssayQuestion.class);

    @Override
    protected Object initController() {
        return new EssayQuestionController(essayQuestionService);
    }

    @DisplayName("에세이 질문 상세 조회 API")
    @Test
    void findByMajorTypeAndGeneration() throws Exception {
        given(essayQuestion.getId()).willReturn(1L);
        given(essayQuestion.getGeneration()).willReturn(11);
        given(essayQuestion.getMajorType()).willReturn(MajorType.MAJOR);
        given(essayQuestion.getContent()).willReturn("에세이 질문");
        given(essayQuestion.getCharacterLimit()).willReturn(600);

        EssayQuestionDetailResponse response = new EssayQuestionDetailResponse(essayQuestion);

        given(essayQuestionService.findByMajorTypeAndGeneration(any(EssayQuestionDetailServiceRequest.class)))
                .willReturn(response);

        mockMvc.perform(
                        get("/api/v1/essay-questions")
                                .queryParam("type", "MAJOR")
                                .queryParam("generation", "11")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-essay-question-by-major-type-and-generation",
                                preprocessResponse(prettyPrint()),
                                queryParameters(
                                        parameterWithName("type").description("전공 여부 (MAJOR, NON_MAJOR)"),
                                        parameterWithName("generation").description("기수")
                                ),
                                responseFields(
                                        fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                                .description("성공 여부"),
                                        fieldWithPath("response").type(JsonFieldType.OBJECT)
                                                .description("응답"),
                                        fieldWithPath("response.id").type(JsonFieldType.NUMBER)
                                                .description("에세이 질문 id"),
                                        fieldWithPath("response.content").type(JsonFieldType.STRING)
                                                .description("에세이 질문 내용"),
                                        fieldWithPath("response.characterLimit").type(JsonFieldType.NUMBER)
                                                .description("글자 수 제한"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }
}
