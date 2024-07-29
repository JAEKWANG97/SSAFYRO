package com.ssafy.ssafyro.api.service.room;

import static com.ssafy.ssafyro.config.RabbitMqConfig.EXCHANGE;
import static com.ssafy.ssafyro.config.RabbitMqConfig.PERSONALITY;
import static com.ssafy.ssafyro.config.RabbitMqConfig.PERSONALITY_KEY;
import static com.ssafy.ssafyro.config.RabbitMqConfig.PRESENTATION;
import static com.ssafy.ssafyro.config.RabbitMqConfig.PRESENTATION_KEY;

import com.ssafy.ssafyro.api.service.room.request.RoomCreateServiceRequest;
import com.ssafy.ssafyro.api.service.room.request.RoomEnterServiceRequest;
import com.ssafy.ssafyro.api.service.room.request.RoomListServiceRequest;
import com.ssafy.ssafyro.api.service.room.response.RoomCreateResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomDetailResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomEnterResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomFastEnterResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomListResponse;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.redis.RoomRedis;
import com.ssafy.ssafyro.domain.room.redis.RoomRedisRepository;
import com.ssafy.ssafyro.domain.room.redis.RoomStatus;
import com.ssafy.ssafyro.error.room.RoomNotFoundException;
import jakarta.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomService {

    private final RoomRedisRepository roomRedisRepository;
    private final RabbitTemplate rabbitTemplate;

    public RoomListResponse getRoomList(RoomListServiceRequest request) {
        List<RoomRedis> rooms = roomRedisRepository.findRooms(request.roomType(),
                request.capacity(), request.status(), request.page(), request.size());

        return RoomListResponse.of(rooms);
    }

    public RoomDetailResponse getRoomById(String id) {

        return roomRedisRepository.findById(id).map(RoomDetailResponse::of)
                .orElseThrow(() -> new RoomNotFoundException("Room not found"));
    }

    public RoomCreateResponse createRoom(RoomCreateServiceRequest request) {
        RoomRedis room = request.toEntity();
        room.addParticipant(request.userId());
        roomRedisRepository.save(room);

        return RoomCreateResponse.of(room.getId());
    }

    public RoomEnterResponse enterRoom(RoomEnterServiceRequest request) {
        RoomRedis room = roomRedisRepository.findById(request.roomId())
                .orElseThrow(() -> new RoomNotFoundException("Room not found"));
        room.addParticipant(request.userId());
        roomRedisRepository.save(room);

        return new RoomEnterResponse();
    }

    public void sendToQueue(RoomType roomType, String roomId) {
        if (roomType.equals(RoomType.INTERVIEW)) {
            rabbitTemplate.convertAndSend(EXCHANGE, PERSONALITY_KEY, roomId);
            return;
        }
        rabbitTemplate.convertAndSend(EXCHANGE, PRESENTATION_KEY, roomId);
    }

    public RoomFastEnterResponse fastRoomEnter(String type) {
        RoomType roomType = RoomType.valueOf(type);
        String queueName = roomType.equals(RoomType.INTERVIEW) ? PERSONALITY : PRESENTATION;
        String routingKey = roomType.equals(RoomType.INTERVIEW) ? PERSONALITY_KEY : PRESENTATION_KEY;

        Set<String> roomIds = getRoomIds(queueName);

        for (String id : roomIds) {
            if (id == null) {
                return RoomFastEnterResponse.notExisting();
            }

            RoomRedis roomRedis = roomRedisRepository.findById(id)
                    .orElseThrow(() -> new RoomNotFoundException("Room not found"));

            if (!roomRedis.getStatus().equals(RoomStatus.WAIT)) {
                return RoomFastEnterResponse.notExisting();
            }
            if (roomRedis.getUserList().size() == 3) {
                rabbitTemplate.convertAndSend(EXCHANGE, routingKey, id);
                continue;
            }

            return new RoomFastEnterResponse(true, id);
        }
        return RoomFastEnterResponse.notExisting();
    }

    private @NotNull Set<String> getRoomIds(String queueName) {
        Set<String> roomIds = new HashSet<>();
        String roomId;
        while ((roomId = (String) rabbitTemplate.receiveAndConvert(queueName)) != null) {
            roomIds.add(roomId);
        }
        return roomIds;
    }

}
