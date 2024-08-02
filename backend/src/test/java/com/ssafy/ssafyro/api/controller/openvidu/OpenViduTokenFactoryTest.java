package com.ssafy.ssafyro.api.controller.openvidu;

import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.ssafyro.IntegrationTestSupport;
import java.util.UUID;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class OpenViduTokenFactoryTest extends IntegrationTestSupport {

    @Autowired
    private OpenViduTokenFactory tokenFactory;

    @DisplayName("회의방 id와 유저 이름을 이용해 openVidu 토큰을 발급한다.")
    @Test
    void createTokenTest() {
        //given
        String roomName = UUID.randomUUID().toString();
        String participantId = "김두열";

        //when
        String token = tokenFactory.createTokenBy(roomName, participantId);

        //then
        assertThat(token).isNotNull();
    }
}