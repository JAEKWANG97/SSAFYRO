package com.ssafy.ssafyro.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
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
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.ssafyro.api.controller.report.ReportController;
import com.ssafy.ssafyro.api.controller.report.request.ReportCreateRequest;
import com.ssafy.ssafyro.api.service.report.ReportService;
import com.ssafy.ssafyro.api.service.report.request.ReportCreateServiceRequest;
import com.ssafy.ssafyro.api.service.report.response.ReportCreateResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportListResponse;
import com.ssafy.ssafyro.domain.report.Report;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.entity.Room;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
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

        given(reportService.showReports(any(Long.class), any(Pageable.class)))
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
                                fieldWithPath("response.reports[].createdDate").type(JsonFieldType.STRING)
                                        .description("면접 날짜(yyyy.mm.dd)"),
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
        given(room.getType()).willReturn(RoomType.PERSONALITY);
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
                                        .description("방 id"),
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

    private String generateRandomRoomId() {
        return UUID.randomUUID().toString();
    }
}
