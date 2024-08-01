package com.ssafy.ssafyro.docs;

import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.ssafyro.api.controller.report.ReportController;
import com.ssafy.ssafyro.api.controller.report.dto.ReportListRequest;
import com.ssafy.ssafyro.api.service.report.ReportService;
import com.ssafy.ssafyro.api.service.report.response.ReportListResponse;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

public class ReportControllerDocsTest extends RestDocsSupport {

    private final ReportService reportService = Mockito.mock(ReportService.class);

    @Override
    protected Object initController() {
        return new ReportController(reportService);
    }

    @DisplayName("면접 레포트 목록 조회 API")
    @Test
    void showReports() throws Exception {
        ReportListRequest request = new ReportListRequest("roomId", 1L);

        given(reportService.showReports(request.toServiceRequest(1, 10)))
                .willReturn(ReportListResponse.builder()
                        .title("title")
                        .type("PRESENTATION")
                        .totalScore(92)
                        .pronunciationScore(3)
                        .createdAt(LocalDateTime.now())
                        .build());

        mockMvc.perform(
                        get("/api/v1/reports")
                                .param("roomId", request.roomId())
                                .param("userId", String.valueOf(request.userId()))
                                .param("page", "1")
                                .param("size", "10")
                                .contentType(MediaType.APPLICATION_JSON)
                ).andDo(print())
                .andExpect(status().isOk())
                .andDo(document("reports-list",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        queryParameters(
                                parameterWithName("roomId").description("방 고유 ID"),
                                parameterWithName("userId").description("유저 고유 ID"),
                                parameterWithName("page").description("페이지 인덱스 번호"),
                                parameterWithName("size").description("페이지 전체 크기")
                        ),
                        responseFields(
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                        .description("성공 여부"),
                                fieldWithPath("response").type(JsonFieldType.OBJECT)
                                        .description("응답"),
                                fieldWithPath("response.title").type(JsonFieldType.STRING)
                                        .description("방 제목"),
                                fieldWithPath("response.type").type(JsonFieldType.STRING)
                                        .description("면접 종류 (인성, PT)"),
                                fieldWithPath("response.totalScore").type(JsonFieldType.NUMBER)
                                        .description("면접 총 점수"),
                                fieldWithPath("response.pronunciationScore").type(JsonFieldType.NUMBER)
                                        .description("발음 점수"),
                                fieldWithPath("response.createdAt").type(JsonFieldType.STRING)
                                        .description("면접 날짜"),
                                fieldWithPath("error").type(JsonFieldType.NULL)
                                        .description("에러")
                        )
                ));
    }
}
