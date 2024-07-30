package com.ssafy.ssafyro.config;

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

    private final RabbitMqProperties rabbitMqProperties;

    public static final String PERSONALITY = "personality";
    public static final String PRESENTATION = "presentation";
    public static final String EXCHANGE = "exchange";
    public static final String PERSONALITY_KEY = "personalityKey";
    public static final String PRESENTATION_KEY = "presentationKey";

    @Bean
    public Queue personalityQueue() {
        return new Queue(PERSONALITY);
    }

    @Bean
    public Queue presentationQueue() {
        return new Queue(PRESENTATION);
    }

    @Bean
    public DirectExchange exchange() {
        return new DirectExchange(EXCHANGE);
    }

    @Bean
    public Binding personalityBinding(Queue personalityQueue, DirectExchange exchange) {
        return BindingBuilder.bind(personalityQueue).to(exchange).with(PERSONALITY_KEY);
    }

    @Bean
    public Binding presentationBinding(Queue presentationQueue, DirectExchange exchange) {
        return BindingBuilder.bind(presentationQueue).to(exchange).with(PRESENTATION_KEY);
    }

//    /**
//     * RabbitMQ 연동을 위한 ConnectionFactory 빈을 생성하여 반환
//     **/
//    @Bean
//    public CachingConnectionFactory connectionFactory() {
//        CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
//        connectionFactory.setHost(rabbitMqProperties.getHost());
//        connectionFactory.setPort(rabbitMqProperties.getPort());
//        connectionFactory.setUsername(rabbitMqProperties.getUsername());
//        connectionFactory.setPassword(rabbitMqProperties.getPassword());
//        return connectionFactory;
//    }
//
//    /**
//     * RabbitTemplate ConnectionFactory 로 연결 후 실제 작업을 위한 Template
//     */
//    @Bean
//    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
//        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
////        rabbitTemplate.setMessageConverter(jackson2JsonMessageConverter());
//        rabbitTemplate.setMessageConverter(String());
//        return rabbitTemplate;
//    }
//
//    /**
//     * 직렬화(메세지를 JSON 으로 변환하는 Message Converter)
//     */
//    @Bean
//    public MessageConverter jackson2JsonMessageConverter() {
//        return new Jackson2JsonMessageConverter();
//    }
}
