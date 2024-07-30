package com.ssafy.ssafyro.api.service.room;

import static com.ssafy.ssafyro.config.RabbitMqConfig.EXCHANGE;
import static com.ssafy.ssafyro.config.RabbitMqConfig.PERSONALITY;
import static com.ssafy.ssafyro.config.RabbitMqConfig.PERSONALITY_KEY;
import static com.ssafy.ssafyro.config.RabbitMqConfig.PRESENTATION;
import static com.ssafy.ssafyro.config.RabbitMqConfig.PRESENTATION_KEY;
import static com.ssafy.ssafyro.domain.room.RoomType.INTERVIEW;
import static com.ssafy.ssafyro.domain.room.RoomType.valueOf;
import static com.ssafy.ssafyro.domain.room.redis.RoomStatus.WAIT;

import com.ssafy.ssafyro.api.service.room.request.RoomCreateServiceRequest;
import com.ssafy.ssafyro.api.service.room.request.RoomEnterServiceRequest;
import com.ssafy.ssafyro.api.service.room.request.RoomExitServiceRequest;
import com.ssafy.ssafyro.api.service.room.request.RoomListServiceRequest;
import com.ssafy.ssafyro.api.service.room.response.RoomCreateResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomDetailResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomEnterResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomExitResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomFastEnterResponse;
import com.ssafy.ssafyro.api.service.room.response.RoomListResponse;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.redis.RoomRedis;
import com.ssafy.ssafyro.domain.room.redis.RoomRedisRepository;
import com.ssafy.ssafyro.error.room.RoomNotFoundException;
import jakarta.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
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
        RoomRedis room = getRoomRedis(request.roomId());
        room.addParticipant(request.userId());
        roomRedisRepository.save(room);

        return new RoomEnterResponse();
    }

    public RoomExitResponse exitRoom(RoomExitServiceRequest request) {
        RoomRedis room = getRoomRedis(request.roomId());
        room.removeParticipant(request.userId());
        roomRedisRepository.save(room);

        return new RoomExitResponse();
    }

    private RoomRedis getRoomRedis(String roomId) {
        return roomRedisRepository.findById(roomId)
                .orElseThrow(() -> new RoomNotFoundException("Room not found"));
    }

    public void sendToQueue(RoomType roomType, String roomId) {
        if (roomType == INTERVIEW) {
            rabbitTemplate.convertAndSend(EXCHANGE, PERSONALITY_KEY, roomId);
            return;
        }
        rabbitTemplate.convertAndSend(EXCHANGE, PRESENTATION_KEY, roomId);
    }

    public RoomFastEnterResponse fastRoomEnter(String type) {
        RoomType roomType = valueOf(type);
        String queueName = roomType == INTERVIEW ? PERSONALITY : PRESENTATION;
        String routingKey = roomType == INTERVIEW ? PERSONALITY_KEY : PRESENTATION_KEY;

        Set<String> maxUserRoom = new HashSet<>();

        while (true) {
            String roomId = (String) rabbitTemplate.receiveAndConvert(queueName);
            if (roomId == null) {
                return RoomFastEnterResponse.notExisting();
            }

            if (canEnterRoom(roomId, maxUserRoom)) {
                resendMaxUserRooms(maxUserRoom, routingKey);
                return new RoomFastEnterResponse(true, roomId);
            }
        }
    }

    private boolean canEnterRoom(String roomId, Set<String> maxUserRoom) {
        RoomRedis roomRedis = getRoomRedis(roomId);

        if (roomRedis.getStatus() != WAIT) {
            return false;
        }

        if (roomRedis.getUserList().size() == 3) {
            maxUserRoom.add(roomId);
            return false;
        }

        return true;
    }

    private void resendMaxUserRooms(Set<String> maxUserRoom, String routingKey) {
        maxUserRoom.forEach(remainId -> rabbitTemplate.convertAndSend(EXCHANGE, routingKey, remainId));
    }


}
