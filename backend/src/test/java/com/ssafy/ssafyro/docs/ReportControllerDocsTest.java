package com.ssafy.ssafyro.docs;

import static com.ssafy.ssafyro.api.service.report.Expression.DISGUST;
import static com.ssafy.ssafyro.api.service.report.Expression.HAPPY;
import static com.ssafy.ssafyro.api.service.report.Expression.SAD;
import static com.ssafy.ssafyro.domain.room.RoomType.PERSONALITY;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
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

import com.ssafy.ssafyro.api.controller.report.request.ReportCreateRequest;
import com.ssafy.ssafyro.api.service.report.request.ReportCreateServiceRequest;
import com.ssafy.ssafyro.api.service.report.request.ReportsScoreServiceRequest;
import com.ssafy.ssafyro.api.service.report.response.ReportCreateResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportPresentationResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportsAverageResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportsResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportsStatisticScoreResponse;
import com.ssafy.ssafyro.domain.article.Article;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResult;
import com.ssafy.ssafyro.domain.report.PresentationInterviewReport;
import com.ssafy.ssafyro.domain.report.Report;
import com.ssafy.ssafyro.domain.report.dto.ReportAllScoreDto;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.entity.Room;
import com.ssafy.ssafyro.security.WithMockJwtAuthentication;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

public class ReportControllerDocsTest extends RestDocsSupport {

    private final Room room = mock(Room.class);
    private final Report report = mock(Report.class);
    private final InterviewResult interviewResult = mock(InterviewResult.class);
    private final PresentationInterviewReport presentationInterviewReport = mock(PresentationInterviewReport.class);

    @DisplayName("면접 레포트 목록 조회 API")
    @Test
    void showReports() throws Exception {
        given(room.getId()).willReturn("roomId");
        given(room.getTitle()).willReturn("title");
        given(room.getType()).willReturn(PERSONALITY);
        given(room.getCreatedDate()).willReturn(LocalDateTime.now());

        given(report.getId()).willReturn(1L);
        given(report.getRoom()).willReturn(room);
        given(report.getTotalScore()).willReturn(90);
        given(report.getPronunciationScore()).willReturn(3);

        ReportsResponse response = ReportsResponse.of(
                List.of(report, report)
        );

        given(reportService.getReports(any(Long.class), any(Pageable.class)))
                .willReturn(response);

        mockMvc.perform(
                        get("/api/v1/reports")
                                .param("userId", "1")
                                .param("page", "1")
                                .param("size", "10")
                                .contentType(MediaType.APPLICATION_JSON)
                ).andDo(print())
                .andExpect(status().isOk())
                .andDo(document("reports-list",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        queryParameters(
                                parameterWithName("userId").description("유저 고유 ID"),
                                parameterWithName("page").description("페이지 인덱스 번호"),
                                parameterWithName("size").description("페이지 전체 크기")
                        ),
                        responseFields(
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                        .description("성공 여부"),
                                fieldWithPath("response").type(JsonFieldType.OBJECT)
                                        .description("응답"),
                                fieldWithPath("response.reports").type(JsonFieldType.ARRAY)
                                        .description("방(레포트) 정보"),
                                fieldWithPath("response.reports[].reportId").type(JsonFieldType.NUMBER)
                                        .description("레포트 고유 ID"),
                                fieldWithPath("response.reports[].title").type(JsonFieldType.STRING)
                                        .description("방 제목"),
                                fieldWithPath("response.reports[].type").type(JsonFieldType.STRING)
                                        .description("면접 종류 (인성, PT)"),
                                fieldWithPath("response.reports[].totalScore").type(JsonFieldType.NUMBER)
                                        .description("면접 총 점수"),
                                fieldWithPath("response.reports[].pronunciationScore").type(JsonFieldType.NUMBER)
                                        .description("발음 점수"),
                                fieldWithPath("response.reports[].createdDate").type(JsonFieldType.STRING)
                                        .description("면접 날짜"),
                                fieldWithPath("error").type(JsonFieldType.NULL)
                                        .description("에러")
                        )
                ));
    }

    @DisplayName("인성 면접 레포트 상세 조회 API")
    @Test
    void getReportPersonal() throws Exception {
        given(room.getId()).willReturn("roomId");
        given(room.getTitle()).willReturn("title");
        given(room.getType()).willReturn(PERSONALITY);
        given(room.getCreatedDate()).willReturn(LocalDateTime.now());

        given(report.getId()).willReturn(1L);
        given(report.getRoom()).willReturn(room);
        given(report.getTotalScore()).willReturn(90);
        given(report.getPronunciationScore()).willReturn(3);

        given(interviewResult.getReport()).willReturn(report);
        given(interviewResult.getQuestion()).willReturn("질문1");
        given(interviewResult.getAnswer()).willReturn("답변");
        given(interviewResult.getFeedback()).willReturn("피드백");
        given(interviewResult.getPronunciationScore()).willReturn(3);
        given(interviewResult.getTop3Expression()).willReturn(
                Map.of(
                        HAPPY, 0.8,
                        SAD, 0.15,
                        DISGUST, 0.05
                )
        );

        ReportResponse response = ReportResponse.of(
                List.of(interviewResult)
        );

        given(reportService.getReport(any(Long.class)))
                .willReturn(response);

        mockMvc.perform(
                        get("/api/v1/report/{id}", report.getId())
                                .contentType(MediaType.APPLICATION_JSON)
                ).andDo(print())
                .andExpect(status().isOk())
                .andDo(document("report-personal-detail-list",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("id").description("report 고유 ID")
                        ),
                        responseFields(
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                        .description("성공 여부"),
                                fieldWithPath("response").type(JsonFieldType.OBJECT)
                                        .description("응답"),
                                fieldWithPath("response.qnaCount").type(JsonFieldType.NUMBER)
                                        .description("질답 횟수"),
                                fieldWithPath("response.reportDetails").type(JsonFieldType.ARRAY)
                                        .description("레포트 상세 정보"),
                                fieldWithPath("response.reportDetails[].question").type(JsonFieldType.STRING)
                                        .description("각 질문"),
                                fieldWithPath("response.reportDetails[].answer").type(JsonFieldType.STRING)
                                        .description("질문 별 답변"),
                                fieldWithPath("response.reportDetails[].feedback").type(JsonFieldType.STRING)
                                        .description("답변의 피드백"),
                                fieldWithPath("response.reportDetails[].pronunciationScore").type(JsonFieldType.NUMBER)
                                        .description("질문 별 발음 점수"),
                                fieldWithPath("response.reportDetails[].expression").type(JsonFieldType.OBJECT)
                                        .description("표정 점수 상위 3개 \n (HAPPY,\n"
                                                + "    DISGUST,\n"
                                                + "    SAD,\n"
                                                + "    SURPRISE,\n"
                                                + "    FEAR,\n"
                                                + "    ANGRY,\n"
                                                + "    NEUTRAL)"),
                                fieldWithPath("response.reportDetails[].expression.HAPPY").type(JsonFieldType.NUMBER)
                                        .description("표정 점수: 행복"),
                                fieldWithPath("response.reportDetails[].expression.SAD").type(JsonFieldType.NUMBER)
                                        .description("표정 점수: 슬픔"),
                                fieldWithPath("response.reportDetails[].expression.DISGUST").type(JsonFieldType.NUMBER)
                                        .description("표정 점수: 역겨움"),
                                fieldWithPath("error").type(JsonFieldType.NULL)
                                        .description("에러")
                        )
                ));
    }

    @DisplayName("PT 면접 레포트 상세 조회 API")
    @Test
    void getReportPresentation() throws Exception {
        Article article = Article.builder()
                .title("기사 제목")
                .content("기사 내용")
                .questions(List.of("기사 질문1", "기사 질문2"))
                .build();

        given(room.getId()).willReturn("roomId");
        given(room.getTitle()).willReturn("title");
        given(room.getType()).willReturn(RoomType.PRESENTATION);
        given(room.getCreatedDate()).willReturn(LocalDateTime.now());

        given(presentationInterviewReport.getId()).willReturn(1L);
        given(presentationInterviewReport.getRoom()).willReturn(room);
        given(presentationInterviewReport.getTotalScore()).willReturn(90);
        given(presentationInterviewReport.getPronunciationScore()).willReturn(3);
        given(presentationInterviewReport.getArticle()).willReturn(article);

        given(interviewResult.getReport()).willReturn(presentationInterviewReport);
        given(interviewResult.getQuestion()).willReturn("질문1");
        given(interviewResult.getAnswer()).willReturn("답변");
        given(interviewResult.getFeedback()).willReturn("피드백");
        given(interviewResult.getPronunciationScore()).willReturn(3);
        given(interviewResult.getTop3Expression()).willReturn(
                Map.of(
                        HAPPY, 0.8,
                        SAD, 0.15,
                        DISGUST, 0.05
                )
        );

        ReportResponse response = ReportPresentationResponse.of(
                List.of(interviewResult),
                article
        );

        given(reportService.getReport(any(Long.class)))
                .willReturn(response);

        mockMvc.perform(
                        get("/api/v1/report/{id}", report.getId())
                                .contentType(MediaType.APPLICATION_JSON)
                ).andDo(print())
                .andExpect(status().isOk())
                .andDo(document("report-presentation-detail-list",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("id").description("report 고유 ID")
                        ),
                        responseFields(
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                        .description("성공 여부"),
                                fieldWithPath("response").type(JsonFieldType.OBJECT)
                                        .description("응답"),
                                fieldWithPath("response.qnaCount").type(JsonFieldType.NUMBER)
                                        .description("질답 횟수"),
                                fieldWithPath("response.article").type(JsonFieldType.OBJECT)
                                        .description("PT 기사 정보"),
                                fieldWithPath("response.article.title").type(JsonFieldType.STRING)
                                        .description("PT 기사 제목"),
                                fieldWithPath("response.article.content").type(JsonFieldType.STRING)
                                        .description("PT 기사 내용"),
                                fieldWithPath("response.article.question[]").type(JsonFieldType.ARRAY)
                                        .description("PT 기사 질문"),
                                fieldWithPath("response.reportDetails").type(JsonFieldType.ARRAY)
                                        .description("레포트 상세 정보"),
                                fieldWithPath("response.reportDetails[].question").type(JsonFieldType.STRING)
                                        .description("각 질문"),
                                fieldWithPath("response.reportDetails[].answer").type(JsonFieldType.STRING)
                                        .description("질문 별 답변"),
                                fieldWithPath("response.reportDetails[].feedback").type(JsonFieldType.STRING)
                                        .description("답변의 피드백"),
                                fieldWithPath("response.reportDetails[].pronunciationScore").type(JsonFieldType.NUMBER)
                                        .description("질문 별 발음 점수"),
                                fieldWithPath("response.reportDetails[].expression").type(JsonFieldType.OBJECT)
                                        .description("표정 점수 상위 3개 \n (HAPPY,\n"
                                                + "    DISGUST,\n"
                                                + "    SAD,\n"
                                                + "    SURPRISE,\n"
                                                + "    FEAR,\n"
                                                + "    ANGRY,\n"
                                                + "    NEUTRAL)"),
                                fieldWithPath("response.reportDetails[].expression.HAPPY").type(JsonFieldType.NUMBER)
                                        .description("표정 점수: 행복"),
                                fieldWithPath("response.reportDetails[].expression.SAD").type(JsonFieldType.NUMBER)
                                        .description("표정 점수: 슬픔"),
                                fieldWithPath("response.reportDetails[].expression.DISGUST").type(JsonFieldType.NUMBER)
                                        .description("표정 점수: 역겨움"),
                                fieldWithPath("error").type(JsonFieldType.NULL)
                                        .description("에러")
                        )
                ));
    }

    @DisplayName("면접 레포트 생성 API")
    @Test
    void createReport() throws Exception {
        given(room.getId()).willReturn("roomId");
        given(room.getTitle()).willReturn("title");
        given(room.getType()).willReturn(PERSONALITY);
        given(room.getCreatedDate()).willReturn(LocalDateTime.now());

        given(report.getId()).willReturn(1L);
        given(report.getRoom()).willReturn(room);
        given(report.getTotalScore()).willReturn(90);
        given(report.getPronunciationScore()).willReturn(3);
        given(report.getUserId()).willReturn(1L);

        ReportCreateResponse response = ReportCreateResponse.of(report);

        given(reportService.createReport(any(ReportCreateServiceRequest.class)))
                .willReturn(response);

        ReportCreateRequest request = new ReportCreateRequest(generateRandomRoomId(), 1L, 1L, 100);

        mockMvc.perform(
                        post("/api/v1/reports")
                                .content(objectMapper.writeValueAsString(request))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("report-create",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("roomId").type(JsonFieldType.STRING)
                                        .description("방 id"),
                                fieldWithPath("articleId").type(JsonFieldType.NUMBER)
                                        .description("기사 id"),
                                fieldWithPath("userId").type(JsonFieldType.NUMBER)
                                        .description("유저 id"),
                                fieldWithPath("totalScore").type(JsonFieldType.NUMBER)
                                        .description("총 점수")
                        ),
                        responseFields(
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                        .description("성공 여부"),
                                fieldWithPath("response").type(JsonFieldType.OBJECT)
                                        .description("응답"),
                                fieldWithPath("response.userId").type(JsonFieldType.NUMBER)
                                        .description("유저 id"),
                                fieldWithPath("response.reportId").type(JsonFieldType.NUMBER)
                                        .description("레포트 id"),
                                fieldWithPath("error").type(JsonFieldType.NULL)
                                        .description("에러")
                        )
                ));
    }

    @DisplayName("유저 레포트 평균 점수 및 표정 평균 API")
    @Test
    @WithMockJwtAuthentication
    void getReportsAverage() throws Exception {
        ReportsAverageResponse response = new ReportsAverageResponse(
                PERSONALITY,
                93,
                80,
                Map.of(
                        HAPPY, 0.8,
                        SAD, 0.15,
                        DISGUST, 0.05
                )
        );

        given(reportService.getReportsScoreAverage(any(Long.class), any(ReportsScoreServiceRequest.class)))
                .willReturn(response);

        mockMvc.perform(
                        get("/api/v1/reports/score-average")
                                .queryParam("roomType", "PERSONALITY")
                                .header("Authorization", "Bearer {JWT Token}")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("reports-average",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                queryParameters(
                                        parameterWithName("roomType").description("PERSONALITY / PRESENTATION")
                                ),
                                responseFields(
                                        fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                                .description("성공 여부"),
                                        fieldWithPath("response").type(JsonFieldType.OBJECT)
                                                .description("응답"),
                                        fieldWithPath("response.roomType").type(JsonFieldType.STRING)
                                                .description("방 타입"),
                                        fieldWithPath("response.totalScore").type(JsonFieldType.NUMBER)
                                                .description("해당 타입 전체 평균 점수"),
                                        fieldWithPath("response.pronunciationScore").type(JsonFieldType.NUMBER)
                                                .description("해당 타입 전체 발음 평균 점수"),
                                        fieldWithPath("response.expressions").type(JsonFieldType.OBJECT)
                                                .description("표정 점수 상위 3개 \n (HAPPY,\n"
                                                        + "    DISGUST,\n"
                                                        + "    SAD,\n"
                                                        + "    SURPRISE,\n"
                                                        + "    FEAR,\n"
                                                        + "    ANGRY,\n"
                                                        + "    NEUTRAL)"),
                                        fieldWithPath("response.expressions.HAPPY").type(JsonFieldType.NUMBER)
                                                .description("표정 점수: 행복"),
                                        fieldWithPath("response.expressions.SAD").type(JsonFieldType.NUMBER)
                                                .description("표정 점수: 슬픔"),
                                        fieldWithPath("response.expressions.DISGUST").type(JsonFieldType.NUMBER)
                                                .description("표정 점수: 역겨움"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }

    @DisplayName("모든 사람의 총점 평균 및 개인의 회차별 점수 API")
    @Test
    @WithMockJwtAuthentication
    void getReportsStatisticScore() throws Exception {
        ReportsStatisticScoreResponse response = new ReportsStatisticScoreResponse(
                PERSONALITY,
                90,
                4,
                List.of(
                        new ReportAllScoreDto("제목1", 80, 3),
                        new ReportAllScoreDto("제목2", 70, 2),
                        new ReportAllScoreDto("제목3", 75, 4)
                )
        );

        given(reportService.getReportsStatisticScore(any(Long.class), any(ReportsScoreServiceRequest.class)))
                .willReturn(response);

        mockMvc.perform(
                        get("/api/v1/reports/statistics-score")
                                .queryParam("roomType", "PERSONALITY")
                                .header("Authorization", "Bearer {JWT Token}")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("reports-statistic-score",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                queryParameters(
                                        parameterWithName("roomType").description("PERSONALITY / PRESENTATION")
                                ),
                                responseFields(
                                        fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                                .description("성공 여부"),
                                        fieldWithPath("response").type(JsonFieldType.OBJECT)
                                                .description("응답"),
                                        fieldWithPath("response.roomType").type(JsonFieldType.STRING)
                                                .description("방 타입"),
                                        fieldWithPath("response.allTotalScore").type(JsonFieldType.NUMBER)
                                                .description("해당 타입 모든 유저 평균 점수"),
                                        fieldWithPath("response.allPronunciationScore").type(JsonFieldType.NUMBER)
                                                .description("해당 타입 모든 유저 평균 발음 점수"),
                                        fieldWithPath("response.scores[]").type(JsonFieldType.ARRAY)
                                                .description("해당 타입 로그인한 유저 회차별 점수"),
                                        fieldWithPath("response.scores[].title").type(JsonFieldType.STRING)
                                                .description("해당 타입 로그인한 유저 회차별 방 제목"),
                                        fieldWithPath("response.scores[].totalScore").type(JsonFieldType.NUMBER)
                                                .description("해당 타입 로그인한 유저 회차별 총점"),
                                        fieldWithPath("response.scores[].pronunciationScore").type(JsonFieldType.NUMBER)
                                                .description("해당 타입 로그인한 유저 회차별 발음 점수"),
                                        fieldWithPath("error").type(JsonFieldType.NULL)
                                                .description("에러")
                                )
                        )
                );
    }

    private String generateRandomRoomId() {
        return UUID.randomUUID().toString();
    }
}
