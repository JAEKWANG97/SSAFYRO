package com.ssafy.ssafyro.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.ssafyro.api.controller.report.ReportController;
import com.ssafy.ssafyro.api.service.report.Expression;
import com.ssafy.ssafyro.api.service.report.ReportService;
import com.ssafy.ssafyro.api.service.report.response.ReportListResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportResponse;
import com.ssafy.ssafyro.domain.interviewresult.InterviewResult;
import com.ssafy.ssafyro.domain.report.Report;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.entity.Room;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

public class ReportControllerDocsTest extends RestDocsSupport {

    private final ReportService reportService = Mockito.mock(ReportService.class);

    private final Report report = Mockito.mock(Report.class);
    private final Room room = Mockito.mock(Room.class);
    private final InterviewResult interviewResult = Mockito.mock(InterviewResult.class);

    @Override
    protected Object initController() {
        return new ReportController(reportService);
    }

    @DisplayName("면접 레포트 목록 조회 API")
    @Test
    void showReports() throws Exception {
        given(room.getId()).willReturn("roomId");
        given(room.getTitle()).willReturn("title");
        given(room.getType()).willReturn(RoomType.PERSONALITY);
        given(room.getCreatedDate()).willReturn(LocalDateTime.now());

        given(report.getId()).willReturn(1L);
        given(report.getRoom()).willReturn(room);
        given(report.getTotalScore()).willReturn(90);
        given(report.getPronunciationScore()).willReturn(3);

        ReportListResponse response = ReportListResponse.of(
                List.of(report)
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
                                        .description("방 정보"),
                                fieldWithPath("response.reports[].reportId").type(JsonFieldType.NUMBER)
                                        .description("방 고유 ID"),
                                fieldWithPath("response.reports[].title").type(JsonFieldType.STRING)
                                        .description("방 제목"),
                                fieldWithPath("response.reports[].type").type(JsonFieldType.STRING)
                                        .description("면접 종류 (인성, PT)"),
                                fieldWithPath("response.reports[].totalScore").type(JsonFieldType.NUMBER)
                                        .description("면접 총 점수"),
                                fieldWithPath("response.reports[].pronunciationScore").type(JsonFieldType.NUMBER)
                                        .description("발음 점수"),
                                fieldWithPath("response.reports[].createdDate").type(JsonFieldType.ARRAY)
                                        .description("면접 날짜"),
                                fieldWithPath("error").type(JsonFieldType.NULL)
                                        .description("에러")
                        )
                ));
    }

    @DisplayName("면접 레포트 상세 조회 API")
    @Test
    void getReport() throws Exception {
        given(room.getId()).willReturn("roomId");
        given(room.getTitle()).willReturn("title");
        given(room.getType()).willReturn(RoomType.PERSONALITY);
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
                        Expression.HAPPY, 0.8,
                        Expression.SAD, 0.15,
                        Expression.DISGUST, 0.05
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
                .andDo(document("report-detail-list",
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
}
