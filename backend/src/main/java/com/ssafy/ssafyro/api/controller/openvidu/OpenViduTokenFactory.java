package com.ssafy.ssafyro.api.controller.openvidu;

import io.livekit.server.AccessToken;
import io.livekit.server.RoomJoin;
import io.livekit.server.RoomName;
import org.springframework.stereotype.Component;

@Component
public class OpenViduTokenFactory {

    public String createTokenBy(String roomName, String participantName) {
        AccessToken token = new AccessToken("LIVEKIT_API_KEY", "LIVEKIT_API_SECRET");
        token.setName(participantName);
        token.setIdentity(participantName);
        token.addGrants(new RoomJoin(true), new RoomName(roomName));

        return token.toJwt();
    }
}
