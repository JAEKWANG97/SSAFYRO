package com.ssafy.ssafyro.domain.room.rabbitmq;

import static com.ssafy.ssafyro.config.rabbitmq.RabbitMqElement.EXCHANGE;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class RoomRabbitMqRepository {

    private final RabbitTemplate rabbitTemplate;

    public void pushQueue(String key, String roomId) {
        rabbitTemplate.convertAndSend(EXCHANGE.getText(), key, roomId);
    }

    public String popQueue(String queueName) {
        return (String) rabbitTemplate.receiveAndConvert(queueName);
    }
    
}
