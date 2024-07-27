package com.ssafy.ssafyro.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.ssafyro.api.controller.room.RoomController;
import com.ssafy.ssafyro.api.controller.room.dto.request.RoomCreateRequest;
import com.ssafy.ssafyro.api.controller.room.dto.request.RoomEnterRequest;
import com.ssafy.ssafyro.api.service.RoomService;
import com.ssafy.ssafyro.api.service.room.request.RoomCreateServiceRequest;
import com.ssafy.ssafyro.api.service.room.request.RoomListServiceRequest;
import com.ssafy.ssafyro.api.service.room.response.RoomCreateResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomDetailResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomEnterResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomListResponse;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.redis.RoomRedis;
import com.ssafy.ssafyro.domain.room.redis.RoomStatus;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;


public class RoomControllerDocsTest extends RestDocsSupport {


    private final RoomService roomService = mock(RoomService.class);

    @Override
    protected Object initController() {
        return new RoomController(roomService);
    }

    @DisplayName("room의 type이 PT, capacity가 3인 경우 모든 방을 보여준다.")
    @Test
    void getAllRoomsTest() throws Exception {

        RoomListResponse roomListResponse = RoomListResponse.of(
                List.of(RoomRedis.builder()
                                .id("1")
                                .title("Conference Room")
                                .description("A spacious conference room")
                                .status(RoomStatus.WAIT)
                                .participantCount(3)
                                .userList(List.of(1L, 2L, 3L))
                                .type(RoomType.PRESENTATION)
                                .capacity(3).build(),
                        RoomRedis.builder()
                                .id("2")
                                .title("Meeting Room")
                                .description("A cozy meeting room")
                                .status(RoomStatus.WAIT)
                                .participantCount(3)
                                .userList(List.of(1L, 2L, 3L))
                                .type(RoomType.PRESENTATION)
                                .capacity(3).build()));

        given(roomService.getRoomList(any(RoomListServiceRequest.class)))
                .willReturn(roomListResponse);

        mockMvc.perform(get("/api/v1/rooms")
                        .param("type", "PT")
                        .param("capacity", "3"))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-rooms",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                        .description("성공 여부"),
                                fieldWithPath("response").type(JsonFieldType.OBJECT)
                                        .description("응답"),
                                fieldWithPath("response.rooms").type(JsonFieldType.ARRAY)
                                        .description("방 목록"),
                                fieldWithPath("response.rooms[].id").type(JsonFieldType.STRING)
                                        .description("방 ID"),
                                fieldWithPath("response.rooms[].title").type(JsonFieldType.STRING)
                                        .description("방 제목"),
                                fieldWithPath("response.rooms[].description").type(JsonFieldType.STRING)
                                        .description("방 설명"),
                                fieldWithPath("response.rooms[].type").type(JsonFieldType.STRING)
                                        .description("방 타입"),
                                fieldWithPath("response.rooms[].capacity").type(JsonFieldType.NUMBER)
                                        .description("방 수용 인원"),
                                fieldWithPath("response.rooms[].status").type(JsonFieldType.STRING)
                                        .description("방 상태"),
                                fieldWithPath("response.rooms[].participantCount").type(JsonFieldType.NUMBER)
                                        .description("방 참가자 수"),
                                fieldWithPath("response.rooms[].userList").type(JsonFieldType.ARRAY)
                                        .description("방 참가자 목록"),
                                fieldWithPath("error").type(JsonFieldType.NULL)
                                        .description("에러")
                        )));
    }

    @DisplayName("특정 ID로 방 정보를 가져온다.")
    @Test
    void getRoomByIdTest() throws Exception {
        int requestRoomId = 1;

        given(roomService.getRoomById(any(String.class)))
                .willReturn(RoomDetailResponse.of(RoomRedis.builder()
                        .title("title")
                        .description("description")
                        .type(RoomType.PRESENTATION)
                        .status(RoomStatus.WAIT)
                        .capacity(3)
                        .participantCount(1)
                        .userList(List.of(1L))
                        .build())
                );

        mockMvc.perform(
                        get("/api/v1/rooms/{id}", requestRoomId)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-room-by-id",
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                        .description("성공 여부"),
                                fieldWithPath("response").type(JsonFieldType.OBJECT)
                                        .description("응답"),
                                fieldWithPath("response.title").type(JsonFieldType.STRING)
                                        .description("방 제목"),
                                fieldWithPath("response.description").type(JsonFieldType.STRING)
                                        .description("방 설명"),
                                fieldWithPath("response.status").type(JsonFieldType.STRING)
                                        .description("방 상태"),
                                fieldWithPath("response.participantCount").type(JsonFieldType.NUMBER)
                                        .description("방 참가자 수"),
                                fieldWithPath("response.userList").type(JsonFieldType.ARRAY)
                                        .description("방 참가자 목록"),
                                fieldWithPath("response.type").type(JsonFieldType.STRING)
                                        .description("방 타입"),
                                fieldWithPath("response.capacity").type(JsonFieldType.NUMBER)
                                        .description("방 수용 인원"),
                                fieldWithPath("error").type(JsonFieldType.NULL)
                                        .description("에러")
                        )));
    }

    @DisplayName("방을 생성합니다.")
    @Test
    void createRoom() throws Exception {
        String RoomId = "1";
        Long userId = 1L;

        RoomCreateRequest roomCreateRequest = new RoomCreateRequest(
                userId,
                "title",
                "description",
                "type",
                3
        );

        given(roomService.createRoom(any(RoomCreateServiceRequest.class)))
                .willReturn(RoomCreateResponse.of(RoomId));

        mockMvc.perform(post("/api/v1/rooms")
                        .content(objectMapper.writeValueAsString(roomCreateRequest))
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("create-room",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("userId").type(JsonFieldType.NUMBER)
                                        .description("유저 ID"),
                                fieldWithPath("title").type(JsonFieldType.STRING)
                                        .description("방 제목"),
                                fieldWithPath("description").type(JsonFieldType.STRING)
                                        .description("방 설명"),
                                fieldWithPath("type").type(JsonFieldType.STRING)
                                        .description("방 이름"),
                                fieldWithPath("capacity").type(JsonFieldType.NUMBER)
                                        .description("방 수용 인원")
                        ),
                        responseFields(
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                        .description("성공 여부"),
                                fieldWithPath("response").type(JsonFieldType.OBJECT)
                                        .description("응답"),
                                fieldWithPath("response.roomId").type(JsonFieldType.STRING)
                                        .description("방 ID"),
                                fieldWithPath("error").type(JsonFieldType.NULL)
                                        .description("에러")
                        )));
    }

    @DisplayName("방을 입장합니다.")
    @Test
    void enterRoom() throws Exception {
        RoomEnterRequest roomEnterRequest = new RoomEnterRequest(1, 1);
        RoomEnterResponse roomEnterResponse = new RoomEnterResponse();

        given(roomService.enterRoom(any()))
                .willReturn(roomEnterResponse);

        mockMvc.perform(post("/api/v1/rooms/enter")
                        .content(objectMapper.writeValueAsString(roomEnterRequest))
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("enter-room",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("userId").type(JsonFieldType.NUMBER)
                                        .description("유저 ID"),
                                fieldWithPath("roomId").type(JsonFieldType.NUMBER)
                                        .description("방 ID")
                        ),
                        responseFields(
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN)
                                        .description("성공 여부"),
                                fieldWithPath("response").type(JsonFieldType.OBJECT)
                                        .description("응답"),
                                fieldWithPath("error").type(JsonFieldType.NULL)
                                        .description("에러")
                        )));
    }

}
