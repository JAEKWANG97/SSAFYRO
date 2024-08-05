package com.ssafy.ssafyro.api.controller.report;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.ssafyro.api.controller.ControllerTestSupport;
import com.ssafy.ssafyro.api.service.report.ReportService;
import com.ssafy.ssafyro.api.service.report.response.ReportPresentationResponse;
import com.ssafy.ssafyro.api.service.report.response.ReportResponse;
import com.ssafy.ssafyro.domain.article.Article;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.entity.Room;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;

class ReportControllerTest extends ControllerTestSupport {

    @MockBean
    private ReportService reportService;

    @DisplayName("인성 면접을 상세 조회한다.")
    @Test
    void getReportPersonal() throws Exception {
        //given
        ReportResponse result = ReportResponse.of(List.of());
        Mockito.when(reportService.getReport(1L))
                .thenReturn(result);

        //when //then
        mockMvc.perform(
                        get("/api/v1/report/{id}", 1L)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.response.reportDetails").isArray());
    }

    @DisplayName("PT 면접을 상세 조회한다.")
    @Test
    void getReportPresentation() throws Exception {
        //given
        ReportResponse result = ReportPresentationResponse.of(
                List.of(),
                Article.builder()
                        .title("")
                        .content("")
                        .question("")
                        .build()
        );
        Mockito.when(reportService.getReport(1L))
                .thenReturn(result);

        //when //then
        mockMvc.perform(
                        get("/api/v1/report/{id}", 1L)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.response.reportDetails").isArray())
                .andExpect(jsonPath("$.response.article").isMap());
    }

    private Room createRoom(RoomType roomType, int num) {
        return Room.builder()
                .id("roomId" + num)
                .title("제목")
                .type(roomType)
                .build();
    }
}