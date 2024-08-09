package com.ssafy.ssafyro.api.service.room;

import static com.ssafy.ssafyro.config.rabbitmq.RabbitMqElement.PERSONALITY_KEY;
import static com.ssafy.ssafyro.config.rabbitmq.RabbitMqElement.PERSONALITY_QUEUE;
import static com.ssafy.ssafyro.config.rabbitmq.RabbitMqElement.PRESENTATION_KEY;
import static com.ssafy.ssafyro.config.rabbitmq.RabbitMqElement.PRESENTATION_QUEUE;
import static com.ssafy.ssafyro.domain.room.RoomType.PERSONALITY;
import static com.ssafy.ssafyro.domain.room.RoomType.valueOf;

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
import com.ssafy.ssafyro.domain.user.User;
import com.ssafy.ssafyro.domain.user.UserRepository;
import com.ssafy.ssafyro.error.room.RoomNotFoundException;
import com.ssafy.ssafyro.error.user.UserNotFoundException;
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

    private final RoomRedisRepository roomRedisRepository;
    private final RoomRabbitMqRepository roomRabbitMqRepository;
    private final UserRepository userRepository;

    public RoomListResponse getRooms(RoomListServiceRequest request) {
        List<RoomRedis> rooms = roomRedisRepository.findRoomsBy(request.toFilterCondition());

        return RoomListResponse.of(rooms);
    }

    public RoomDetailResponse getRoomById(String id) {

        return roomRedisRepository.findBy(id).map(RoomDetailResponse::of)
                .orElseThrow(() -> new RoomNotFoundException("Room not found"));
    }

    public RoomCreateResponse createRoom(Long userId, RoomCreateServiceRequest request) {
        User user = getUser(userId);

        RoomRedis room = request.toEntity();
        room.addParticipant(user.getId());
        roomRedisRepository.save(room);

        sendToQueue(request.type(), room.getId());

        return RoomCreateResponse.of(room.getId());
    }

    public RoomEnterResponse enterRoom(Long userId, RoomEnterServiceRequest request) {
        User user = getUser(userId);

        RoomRedis room = getRoomRedisBy(request.roomId());
        room.addParticipant(user.getId());
        roomRedisRepository.save(room);

        return new RoomEnterResponse();
    }

    public RoomExitResponse exitRoom(Long userId, RoomExitServiceRequest request) {
        User user = getUser(userId);

        RoomRedis room = getRoomRedisBy(request.roomId());
        room.removeParticipant(user.getId());
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

    private RoomRedis getRoomRedisBy(String roomId) {
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
        return roomRedisRepository.findBy(roomId)
                .map(roomRedis -> {
                    if (!roomRedis.isRecruiting()) {
                        return false;
                    }
                    remainRooms.add(roomId);

                    return roomRedis.isEnoughCapacity();
                })
                .orElse(false);
    }

    private void resendRemainRooms(Set<String> remainRooms, String routingKey) {
        remainRooms.forEach(remainId -> roomRabbitMqRepository.pushQueue(routingKey, remainId));
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }
}
