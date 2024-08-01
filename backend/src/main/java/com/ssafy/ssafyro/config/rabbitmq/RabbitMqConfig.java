package com.ssafy.ssafyro.config.rabbitmq;

import static com.ssafy.ssafyro.config.rabbitmq.RabbitMqElement.EXCHANGE;
import static com.ssafy.ssafyro.config.rabbitmq.RabbitMqElement.PERSONALITY_KEY;
import static com.ssafy.ssafyro.config.rabbitmq.RabbitMqElement.PERSONALITY_QUEUE;
import static com.ssafy.ssafyro.config.rabbitmq.RabbitMqElement.PRESENTATION_KEY;
import static com.ssafy.ssafyro.config.rabbitmq.RabbitMqElement.PRESENTATION_QUEUE;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
@EnableConfigurationProperties(RabbitMqProperties.class)
public class RabbitMqConfig {

    @Bean
    public Queue personalityQueue() {
        return new Queue(PERSONALITY_QUEUE.getText());
    }

    @Bean
    public Queue presentationQueue() {
        return new Queue(PRESENTATION_QUEUE.getText());
    }

    @Bean
    public DirectExchange exchange() {
        return new DirectExchange(EXCHANGE.getText());
    }

    @Bean
    public Binding personalityBinding(Queue personalityQueue, DirectExchange exchange) {
        return BindingBuilder.bind(personalityQueue).to(exchange).with(PERSONALITY_KEY.getText());
    }

    @Bean
    public Binding presentationBinding(Queue presentationQueue, DirectExchange exchange) {
        return BindingBuilder.bind(presentationQueue).to(exchange).with(PRESENTATION_KEY.getText());
    }

}
