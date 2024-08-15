// Openvidu 기능 이전 및 모듈화를 위한 ConnectOpenvidu.js

import {
    LocalVideoTrack,
    RemoteParticipant,
    RemoteTrack,
    RemoteTrackPublication,
    Room,
    RoomEvent,
    TrackPublication,
  } from "livekit-client";
import { useState } from "react";


function ConnectOpenvidu() {

    let APPLICATION_SERVER_URL = "https://i11c201.p.ssafy.io:8443/api/v1/openvidu/" // Application 서버 주소
    let LIVEKIT_URL = "wss://i11c201.p.ssafy.io/" // LiveKit 서버 주소
    const configureUrls = function () {
        if (!APPLICATION_SERVER_URL) {
            if (window.location.hostname === "localhost") {
                APPLICATION_SERVER_URL = "http://localhost:6080/"
            } else {
                APPLICATION_SERVER_URL =
                    "https://" + window.location.hostname + ":6443/"
            }
        }
    
        if (!LIVEKIT_URL) {
            if (window.location.hostname === "localhost") {
                LIVEKIT_URL = "ws://localhost:7880/"
            } else {
                LIVEKIT_URL = "wss://" + window.location.hostname + ":7443/"
            }
        }
    }
    
    // OpenVidu Token 가져오기
    /**
     * --------------------------------------------
     * GETTING A TOKEN FROM YOUR APPLICATION SERVER
     * --------------------------------------------
     * The method below request the creation of a token to
     * your application server. This prevents the need to expose
     * your LiveKit API key and secret to the client side.
     *
     * In this sample code, there is no user control at all. Anybody could
     * access your application server endpoints. In a real production
     * environment, your application server must identify the user to allow
     * access to the endpoints.
     */
    const getToken = async function (roomName, participantName) {
        const response = await fetch(APPLICATION_SERVER_URL + "token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                roomName: roomName,
                participantName: participantName,
            }),
        })
    
        if (!response.ok) {
            const error = await response.json()
            throw new Error(`Failed to get token: ${error.errorMessage}`)
        }
    
        const data = await response.json()
        // console.log(data.response.token);
        return data.response.token
    }
    
    // OpenVidu 연결 종료
    const leaveRoom = async function () {
        // Leave the room by calling 'disconnect' method over the Room object
        await room?.disconnect()
    
        // Reset the state
        setRoom(undefined)
        setLocalTrack(undefined)
        setRemoteTracks([])
    }
    
    // OpenVidu 변수 초기 선언
    const [room, setRoom] = useState(undefined)
    const [localTrack, setLocalTrack] = useState(undefined)
    const [remoteTracks, setRemoteTracks] = useState([])
    
    // const [participantName, setParticipantName] = useState(
    //     "Participant" + Math.floor(Math.random() * 100)
    // )
    // const [roomName, setRoomName] = useState(roomId)
    
    const joinRoom = async function (roomId, userName) {
        const room = new Room() // Initialize a now Room object
        setRoom(room)
    
        // Specify the actions when events take place in the room
        // On every new Track recived...
        room.on(RoomEvent.TrackSubscribed, (_track, publication, participant) => {
            setRemoteTracks((prev) => [
                ...prev,
                {
                    trackPublication: publication,
                    participantIdentity: participant.identity,
                },
            ])
        })
    
        // On every Track destroyed...
        room.on(RoomEvent.TrackUnsubscribed, (_track, publication) => {
            setRemoteTracks((prev) =>
                prev.filter(
                    (track) =>
                        track.trackPublication.trackSid !== publication.trackSid
                )
            )
        })
    
        try {
            // Get a token from your application server with the room name ane participant name
            // console.log(roomName, participantName);
            const token = await getToken(roomId, userName)
    
            // Connect to the room with the LiveKit URL and the token
            await room.connect(LIVEKIT_URL, token)
            // console.log("Connected to the room", room.name);
            // Publish your camera and microphone
            await room.localParticipant.enableCameraAndMicrophone()
            setLocalTrack(
                room.localParticipant.videoTrackPublications.values().next().value
                    .videoTrack
            )
        } catch (error) {
            console.log(
                "화상 면접실에 연결하는 중 오류가 발생했습니다.",
                error.message
            )
            await leaveRoom()
        }
    }

    return { configureUrls, getToken, leaveRoom, joinRoom, localTrack, remoteTracks }
}


export default ConnectOpenvidu;