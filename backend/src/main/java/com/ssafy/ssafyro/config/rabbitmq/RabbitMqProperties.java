package com.ssafy.ssafyro.config.rabbitmq;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@AllArgsConstructor
@ConfigurationProperties("spring.rabbitmq")
public class RabbitMqProperties {

    private String host;
    private int port;
    private String username;
    private String password;
    
}
