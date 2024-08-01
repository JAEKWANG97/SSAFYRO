package com.ssafy.ssafyro.docs;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.ssafyro.api.controller.itKnowledge.ItKnowledgeController;
import com.ssafy.ssafyro.api.service.itKnowledge.ItKnowledgeService;
import com.ssafy.ssafyro.api.service.itKnowledge.request.ItKnowledgeDetailServiceRequest;
import com.ssafy.ssafyro.api.service.itKnowledge.response.ItKnowledgeDetailResponse;
import org.junit.jupiter.api.Test;
import org.springframework.restdocs.payload.JsonFieldType;

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


}
