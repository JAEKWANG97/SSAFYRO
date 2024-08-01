package com.ssafy.ssafyro;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@SpringBootTest
public abstract class IntegrationTestSupport {

//    protected static final String REDIS_IMAGE = "redis:6-alpine";
//    protected static final String RABBITMQ_IMAGE = "rabbitmq:management";
//    protected static final GenericContainer REDIS_CONTAINER;
//    protected static final GenericContainer RABBITMQ_CONTAINER;
//
//    static {
//        REDIS_CONTAINER = new GenericContainer<>(REDIS_IMAGE)
//                .withExposedPorts(6379)
//                .withReuse(true);
//        RABBITMQ_CONTAINER = new GenericContainer(RABBITMQ_IMAGE)
//                .withExposedPorts(5672)
//                .withReuse(true);
//
//        REDIS_CONTAINER.start();
//        RABBITMQ_CONTAINER.start();
//    }
//
//    @DynamicPropertySource
//    public static void overrideProps(DynamicPropertyRegistry registry) {
//        registry.add("spring.data.redis.host", REDIS_CONTAINER::getHost);
//        registry.add("spring.data.redis.port", () -> REDIS_CONTAINER.getMappedPort(6379));
//
//        registry.add("spring.rabbitmq.host", RABBITMQ_CONTAINER::getHost);
//        registry.add("spring.rabbitmq.port", () -> RABBITMQ_CONTAINER.getMappedPort(5672));
//    }
}
