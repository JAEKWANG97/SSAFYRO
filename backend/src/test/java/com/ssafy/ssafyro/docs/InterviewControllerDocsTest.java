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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.ssafyro.api.controller.interview.InterviewController;
import com.ssafy.ssafyro.api.controller.interview.dto.ArticleResponse;
import com.ssafy.ssafyro.api.controller.interview.dto.StartRequest;
import com.ssafy.ssafyro.api.service.interview.InterviewService;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
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

    @DisplayName("기사 제공 및 질문 생성 API")
    @Test
    void showArticle() throws Exception {
        String request = "roomId";

        given(interviewService.showArticle(any()))
                .willReturn(
                        new ArticleResponse(
                                " 트럼프가 총에 맞았지만 엄청난 운으로 살아남았다. 투명 트럼프가 울부짖었다. 크아아아앙. 투명 트럼프는 존나 강해서 미국 대통령 선거를 씹어먹었다.\n",
                                List.of("다음 기사를 읽고 현재 불편 사항을 개선할 서비스를 제안하시오.",
                                        "알아서 잘 수행하시오.")
                        ));

        mockMvc.perform(
                        get("/api/v1/interview/pt/{roomId}", request) // URL 템플릿에 roomId를 동적으로 삽입
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("article-question-show",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                        .description("성공 여부"),
                                fieldWithPath("response").type(JsonFieldType.OBJECT)
                                        .description("응답"),
                                fieldWithPath("response.article").type(JsonFieldType.STRING)
                                        .description("기사 내용"),
                                fieldWithPath("response.question").type(JsonFieldType.ARRAY)
                                        .description("기사에 대한 질문"),
                                fieldWithPath("error").type(JsonFieldType.NULL)
                                        .description("에러")
                        )
                ));
    }
}
