package com.ssafy.ssafyro.api.service.room;

import static com.ssafy.ssafyro.config.rabbitmq.RabbitMqElement.PERSONALITY_KEY;
import static com.ssafy.ssafyro.config.rabbitmq.RabbitMqElement.PERSONALITY_QUEUE;
import static com.ssafy.ssafyro.config.rabbitmq.RabbitMqElement.PRESENTATION_KEY;
import static com.ssafy.ssafyro.config.rabbitmq.RabbitMqElement.PRESENTATION_QUEUE;
import static com.ssafy.ssafyro.domain.room.RoomType.PERSONALITY;
import static com.ssafy.ssafyro.domain.room.RoomType.valueOf;
import static com.ssafy.ssafyro.domain.room.redis.RoomStatus.WAIT;

import com.ssafy.ssafyro.api.service.room.response.RoomFastEnterResponse;
import com.ssafy.ssafyro.domain.room.RoomType;
import com.ssafy.ssafyro.domain.room.rabbitmq.RoomRabbitMqRepository;
import com.ssafy.ssafyro.domain.room.redis.RoomRedis;
import java.util.HashSet;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RoomRabbitMqService {

    private final RoomService roomService;
    private final RoomRabbitMqRepository roomRabbitMqRepository;

    public void sendToQueue(String type, String roomId) {
        if (PERSONALITY.equals(RoomType.valueOf(type))) {
            roomRabbitMqRepository.pushQueue(PERSONALITY_KEY.getText(), roomId);
            return;
        }
        roomRabbitMqRepository.pushQueue(PRESENTATION_KEY.getText(), roomId);
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

    private boolean canEnterRoom(String roomId, Set<String> remainRooms) {
        RoomRedis roomRedis = roomService.getRoomRedis(roomId);

        if (roomRedis.getStatus() != WAIT) {
            return false;
        }
        remainRooms.add(roomId);

        return roomRedis.getUserList().size() != 3;
    }

    private void resendRemainRooms(Set<String> remainRooms, String routingKey) {
        remainRooms.forEach(remainId -> roomRabbitMqRepository.pushQueue(routingKey, remainId));
    }

}
