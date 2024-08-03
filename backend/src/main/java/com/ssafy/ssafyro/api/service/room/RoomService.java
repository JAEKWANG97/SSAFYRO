package com.ssafy.ssafyro.api.service.room;

import static com.ssafy.ssafyro.config.rabbitmq.RabbitMqElement.PERSONALITY_KEY;
import static com.ssafy.ssafyro.config.rabbitmq.RabbitMqElement.PERSONALITY_QUEUE;
import static com.ssafy.ssafyro.config.rabbitmq.RabbitMqElement.PRESENTATION_KEY;
import static com.ssafy.ssafyro.config.rabbitmq.RabbitMqElement.PRESENTATION_QUEUE;
import static com.ssafy.ssafyro.domain.room.RoomType.PERSONALITY;
import static com.ssafy.ssafyro.domain.room.RoomType.valueOf;
import static com.ssafy.ssafyro.domain.room.RoomStatus.WAIT;

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
import com.ssafy.ssafyro.domain.room.rabbitmq.RoomRabbitMqRepository;
import com.ssafy.ssafyro.domain.room.redis.RoomRedis;
import com.ssafy.ssafyro.domain.room.redis.RoomRedisRepository;
import com.ssafy.ssafyro.error.room.RoomNotFoundException;
import jakarta.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomService {

    private final int MAX_USERS = 3;

    private final RoomRedisRepository roomRedisRepository;
    private final RoomRabbitMqRepository roomRabbitMqRepository;

    public RoomListResponse getRooms(RoomListServiceRequest request) {
        List<RoomRedis> rooms = roomRedisRepository.findRoomsBy(request.toFilterCondition());

        return RoomListResponse.of(rooms);
    }

    public RoomDetailResponse getRoomById(String id) {

        return roomRedisRepository.findBy(id).map(RoomDetailResponse::of)
                .orElseThrow(() -> new RoomNotFoundException("Room not found"));
    }

    public RoomCreateResponse createRoom(RoomCreateServiceRequest request) {
        RoomRedis room = request.toEntity();
        room.addParticipant(request.userId());
        roomRedisRepository.save(room);

        sendToQueue(request.type(), room.getId());

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

    public RoomFastEnterResponse fastRoomEnter(String type) {
        RoomType roomType = valueOf(type);
        String queueName = roomType.equals(PERSONALITY) ? PERSONALITY_QUEUE.getText() : PRESENTATION_QUEUE.getText();
        String routingKey = roomType.equals(PERSONALITY) ? PERSONALITY_KEY.getText() : PRESENTATION_KEY.getText();

        Set<String> remainRooms = new HashSet<>();

        while (true) {
            String roomId = roomRabbitMqRepository.popQueue(queueName);
            if (roomId == null) {
                return RoomFastEnterResponse.notExisting();
            }

            if (canEnterRoom(roomId, remainRooms)) {
                resendRemainRooms(remainRooms, routingKey);
                return new RoomFastEnterResponse(true, roomId);
            }
        }
    }

    private RoomRedis getRoomRedis(String roomId) {
        return roomRedisRepository.findBy(roomId)
                .orElseThrow(() -> new RoomNotFoundException("Room not found"));
    }

    private void sendToQueue(String type, String roomId) {
        if (PERSONALITY.equals(RoomType.valueOf(type))) {
            roomRabbitMqRepository.pushQueue(PERSONALITY_KEY.getText(), roomId);
            return;
        }
        roomRabbitMqRepository.pushQueue(PRESENTATION_KEY.getText(), roomId);
    }

    private boolean canEnterRoom(String roomId, Set<String> remainRooms) {
        RoomRedis roomRedis = getRoomRedis(roomId);

        if (!WAIT.equals(roomRedis.getStatus())) {
            return false;
        }
        remainRooms.add(roomId);

        return roomRedis.getUserList().size() != MAX_USERS;
    }

    private void resendRemainRooms(Set<String> remainRooms, String routingKey) {
        remainRooms.forEach(remainId -> roomRabbitMqRepository.pushQueue(routingKey, remainId));
    }

}
