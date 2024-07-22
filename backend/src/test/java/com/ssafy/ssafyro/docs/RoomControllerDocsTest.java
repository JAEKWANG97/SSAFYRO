package com.ssafy.ssafyro.docs;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.ssafyro.api.controller.room.RoomController;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.restdocs.payload.JsonFieldType;

@WebMvcTest(RoomController.class)
public class RoomControllerDocsTest extends RestDocsSupport {

    @Override
    protected Object initController() {
        return new RoomController();
    }

    @DisplayName("room의 상태가 모두 null인 경우 모든 방을 보여준다.")
    @Test
    void getAllRoomsTest() throws Exception {
        // when
        mockMvc.perform(get("/api/v1/rooms")
                        .param("roomType", "PT")
                        .param("participantsNumber", "3"))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-rooms",
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                        .description("성공 여부"),
                                fieldWithPath("response").type(JsonFieldType.OBJECT)
                                        .description("응답"),
                                fieldWithPath("response.rooms").type(JsonFieldType.ARRAY)
                                        .description("방 목록"),
                                fieldWithPath("error").type(JsonFieldType.NULL)
                                        .description("에러")
                        )));
    }
}
