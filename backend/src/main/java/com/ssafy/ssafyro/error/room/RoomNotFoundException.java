package com.ssafy.ssafyro.error.room;

public class RoomNotFoundException extends RuntimeException {

    public RoomNotFoundException() {
        super("Room Not Found Exception");
    }

    public RoomNotFoundException(String message) {
        super(message);
    }

    public RoomNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public RoomNotFoundException(Throwable cause) {
        super(cause);
    }
}
