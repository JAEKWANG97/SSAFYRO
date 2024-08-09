package com.ssafy.ssafyro.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.ssafyro.api.controller.interview.request.FinishRequest;
import com.ssafy.ssafyro.api.controller.interview.request.QnAResultCreateRequest;
import com.ssafy.ssafyro.api.controller.interview.request.StartRequest;
import com.ssafy.ssafyro.api.service.interview.InterviewService;
import com.ssafy.ssafyro.api.service.interview.request.QnAResultCreateServiceRequest;
import com.ssafy.ssafyro.api.service.interview.response.ArticleResponse;
import com.ssafy.ssafyro.api.service.interview.response.QnAResultCreateResponse;
import com.ssafy.ssafyro.api.service.interview.response.StartResponse;
import com.ssafy.ssafyro.security.WithMockJwtAuthentication;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

public class InterviewControllerDocsTest extends RestDocsSupport {

    @MockBean
    private InterviewService interviewService;

    @DisplayName("면접시작 API")
    @Test
    void startInterview() throws Exception {
        StartRequest startRequest = new StartRequest("roomId");

        given(interviewService.startInterview(any()))
                .willReturn(new StartResponse("0a28f311-7d36-4813-a222-e5b3fee758bd"));

        mockMvc.perform(
                        patch("/api/v1/interview/start")
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
                                fieldWithPath("response.startRoomId").type(JsonFieldType.STRING)
                                        .description("회의 시작된 방 ID"),
                                fieldWithPath("error").type(JsonFieldType.NULL)
                                        .description("에러")
                        )
                ));
    }

    @DisplayName("기사 제공 및 질문 생성 API")
    @Test
    void showArticle() throws Exception {
        String request = "roomId";

        given(interviewService.getArticle(any()))
                .willReturn(
                        new ArticleResponse(
                                1L,
                                "기사 제목",
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
                        pathParameters(
                                parameterWithName("roomId").description("방 고유 아이디. 해당 인터뷰 방의 고유 식별자로 사용됩니다.")
                        ),
                        responseFields(
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                        .description("성공 여부"),
                                fieldWithPath("response").type(JsonFieldType.OBJECT)
                                        .description("응답"),
                                fieldWithPath("response.id").type(JsonFieldType.NUMBER)
                                        .description("기사 id"),
                                fieldWithPath("response.title").type(JsonFieldType.STRING)
                                        .description("기사 제목"),
                                fieldWithPath("response.content").type(JsonFieldType.STRING)
                                        .description("기사 내용"),
                                fieldWithPath("response.question").type(JsonFieldType.ARRAY)
                                        .description("기사에 대한 질문"),
                                fieldWithPath("error").type(JsonFieldType.NULL)
                                        .description("에러")
                        )
                ));
    }

    @DisplayName("면접 질문, 답변 저장 API")
    @Test
    @WithMockJwtAuthentication
    void createQuestionResult() throws Exception {
        QnAResultCreateRequest request = QnAResultCreateRequest.builder()
                .question("자신의 강점이 뭐라고 생각하시나요?")
                .answer("포기할 줄 모르는 자세입니다.")
                .pronunciationScore(3)
                .happy(0.9)
                .disgust(0.01)
                .sad(0.01)
                .surprise(0.01)
                .fear(0.01)
                .angry(0.01)
                .neutral(0.01)
                .build();

        given(interviewService.createQnAResult(any(Long.class), any(QnAResultCreateServiceRequest.class)))
                .willReturn(new QnAResultCreateResponse(1L));

        mockMvc.perform(
                        post("/api/v1/interview/question-answer-result")
                                .header("Authorization", "Bearer {JWT Token}")
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
                                        .description("면접 답변"),
                                fieldWithPath("pronunciationScore").type(JsonFieldType.NUMBER)
                                        .description("발음 점수"),
                                fieldWithPath("evaluationScore").type(JsonFieldType.NUMBER)
                                        .description("평가 점수"),
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
                                fieldWithPath("response").type(JsonFieldType.OBJECT)
                                        .description("응답"),
                                fieldWithPath("response.userId").type(JsonFieldType.NUMBER)
                                        .description("유저 id"),
                                fieldWithPath("error").type(JsonFieldType.NULL)
                                        .description("에러")
                        )
                ));
    }

    @DisplayName("면접 종료 API")
    @Test
    void finishInterview() throws Exception {
        FinishRequest request = new FinishRequest("roomId");

        mockMvc.perform(
                        patch("/api/v1/interview/finish")
                                .content(objectMapper.writeValueAsString(request))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("interview-finish",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("roomId").type(JsonFieldType.STRING)
                                        .description("방 고유 id")
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
