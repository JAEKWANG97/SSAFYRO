package com.ssafy.ssafyro.docs;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.mock;
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

import com.ssafy.ssafyro.api.controller.itKnowledge.ItKnowledgeController;
import com.ssafy.ssafyro.api.service.itKnowledge.ItKnowledgeService;
import com.ssafy.ssafyro.api.service.itKnowledge.request.ItKnowledgeDetailServiceRequest;
import com.ssafy.ssafyro.api.service.itKnowledge.request.ItKnowledgeListServiceRequest;
import com.ssafy.ssafyro.api.service.itKnowledge.response.ItKnowledgeDetailResponse;
import com.ssafy.ssafyro.api.service.itKnowledge.response.ItKnowledgeListResponse;
import java.util.Collections;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

public class ItknowledgeControllerDocsTest extends RestDocsSupport {

    private final ItKnowledgeService itKnowledgeService = mock(ItKnowledgeService.class);

    @Override
    protected Object initController() {
        return new ItKnowledgeController(itKnowledgeService);
    }

    @Test
    public void getItKnowledgeDetail() throws Exception {
        // given
        Long id = 1L;
        ItKnowledgeDetailResponse itKnowledgeDetailResponse = ItKnowledgeDetailResponse.builder()
                .id(id)
                .title("title")
                .thumbnailImageUrl("https://thumbnailImageUrl.com")
                .articleUrl("https://articleUrl.com")
                .build();

        given(itKnowledgeService.getItKnowledgeDetail(any(ItKnowledgeDetailServiceRequest.class)))
                .willReturn(itKnowledgeDetailResponse);

        // when & then
        mockMvc.perform(get("/api/v1/it-knowledge/{id}", id).param("id", String.valueOf(id)))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("it-knowledge-detail",
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("id").description("IT 지식 ID")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("IT 지식 ID"),
                                fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("thumbnailImageUrl").type(JsonFieldType.STRING)
                                        .description("썸네일 이미지 URL"),
                                fieldWithPath("articleUrl").type(JsonFieldType.STRING).description("기사 URL")
                        )
                ));
    }

    @DisplayName("IT Knowledge List 조회")
    @Test
    void getItKnowledgeList() throws Exception {
        // given
        Pageable pageable = PageRequest.of(0, 10, Sort.by("createdDate").descending());
        ItKnowledgeListResponse response = ItKnowledgeListResponse.of(
                new PageImpl<>(Collections.emptyList(), pageable, 0));

        given(itKnowledgeService.getItKnowledgeList(any(ItKnowledgeListServiceRequest.class)))
                .willReturn(response);

        // when & then
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/it-knowledge")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sort", "createdDate,desc")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(document("get-it-knowledge-list",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        queryParameters(
                                parameterWithName("page").description("페이지 번호"),
                                parameterWithName("size").description("페이지 크기"),
                                parameterWithName("sort").description("정렬 방식")
                        ),
                        responseFields(
                                fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답"),
                                fieldWithPath("response.itKnowledgeList").type(JsonFieldType.ARRAY)
                                        .description("IT 지식 목록")
                        )));
    }
}

