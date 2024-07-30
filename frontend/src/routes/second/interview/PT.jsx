import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// OpenVidu-liveKit import
import {
  LocalVideoTrack,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
  TrackPublication,
} from "livekit-client";
// OpenVidu Components
import VideoComponent from "./components/VideoComponent";
import AudioComponent from "./components/AudioComponent";

export default function PT() {
  const { roomid } = useParams();

  const navigate = useNavigate();

  const handleEndInterview = () => {
    navigate("/second/interview");
  };

  const handleStartSurvey = () => {
    navigate(`/second/interview/room/${roomid}/pt/survey`);
  };

  // video 출력 테스트 코드입니다.
  let videoStream = useRef(null);
  const constraints = {
    audio: true,
    video: true,
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      videoStream.current.srcObject = stream;
    })
    .catch((error) => console.log(error));
  // video 출력 테스트 코드 끝

  // OpenVidu 연결 코드입니다.
  // 참고 출처: https://openvidu.io/3.0.0-beta2/docs/tutorials/application-client/react/#understanding-the-code
  let APPLICATION_SERVER_URL = ""; // Application 서버 주소
  let LIVEKIT_URL = ""; // LiveKit 서버 주소
  const configureUrls = function () {
    if (!APPLICATION_SERVER_URL) {
      if (window.location.hostname === "localhost") {
        APPLICATION_SERVER_URL = "https://localhost:6080/";
      } else {
        APPLICATION_SERVER_URL =
          "https://" + window.location.hostname + ":6443/";
      }
    }

    if (!LIVEKIT_URL) {
      if (window.location.hostname === "localhost") {
        LIVEKIT_URL = "https://localhost:7880/";
      } else {
        LIVEKIT_URL = "https://" + window.location.hostname + ":7443/";
      }
    }
  };

  configureUrls();

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
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to get token: ${error.errorMessage}`);
    }

    const data = await response.json();
    return data.token;
  };

  // OpenVidu 변수 초기 선언
  const [room, setRoom] = useState(undefined);
  const [localTrack, setLocalTrack] = useState(undefined);
  const [remoteTracks, setRemoteTracks] = useState([]);

  const [participantName, setParticipantName] = useState(
    "Participant" + Math.floor(Math.random() * 100)
  );
  const [roomName, setRoomName] = useState("Test Room");

  const joinRoom = async function () {
    const room = new Room(); // Initialize a now Room object
    setRoom(room);

    // Specify the actions when events take place in the room
    // On every new Track recived...
    room.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
      setRemoteTracks((prev) => [
        ...prev,
        {
          trackPublication: publication,
          participantIdentity: participant.identity,
        },
      ]);
    });

    // On every Track destroyed...
    room.on(RoomEvent.TrackUnsubscribed, (track, publication) => {
      setRemoteTracks((prev) =>
        prev.filter(
          (track) => track.trackPublication.trackSid !== publication.trackSid
        )
      );
    });

    try {
      // Get a token from your application server with the room name ane participant name
      const token = await getToken(roomName, participantName);

      // Connect to the room with the LiveKit URL and the token
      await room.connect(LIVEKIT_URL, token);

      // Publish your camera and microphone
      await room.localParticipant.enableCameraAndMicrophone();
      setLocalTrack(
        room.localParticipant.videoTrackPublications.values().next().value
          .videoTrack
      );
    } catch (error) {
      console.log(
        "화상 면접실에 연결하는 중 오류가 발생했습니다.",
        error.message
      );
      await leaveRoom();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-5xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-2xl font-semibold">1</span>
            <span className="text-lg ml-1">Minutes</span>
            <span className="text-2xl font-semibold ml-4">59</span>
            <span className="text-lg ml-1">Seconds</span>
          </div>
          <button
            onClick={handleEndInterview}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            면접 종료
          </button>
        </div>
        <div className="flex justify-between mb-6">
          <div className="flex space-x-4">
            <div className="w-24 h-32 bg-gray-300 flex flex-col items-center justify-center rounded">
              <div className="w-16 h-16 bg-white rounded-full mb-2"></div>
              <span className="text-gray-600">이정준</span>
            </div>
            <div className="w-24 h-32 bg-gray-300 flex flex-col items-center justify-center rounded border-4 border-blue-500">
              <div className="w-16 h-16 bg-white rounded-full mb-2"></div>
              <span className="text-gray-600">이정준</span>
            </div>
            <div className="w-24 h-32 bg-gray-300 flex flex-col items-center justify-center rounded">
              <div className="w-16 h-16 bg-white rounded-full mb-2"></div>
              <span className="text-gray-600">이정준</span>
            </div>
            <div>
              <video ref={videoStream} autoPlay playsInline></video>
            </div>
            {/* OpenVidu 화상 회의 레이아웃 */}
            <div>
              {localTrack && (
                <VideoComponent
                  track={localTrack}
                  participantIdentity={participantName}
                  local={true}
                />
              )}
              {remoteTracks.map((remoteTrack) =>
                remoteTrack.trackPublication.kind === "video" ? (
                  <VideoComponent
                    key={remoteTrack.trackPublication.trackSid}
                    track={remoteTrack.trackPublication.videoTrack}
                    participantIdentity={remoteTrack.participantIdentity}
                  />
                ) : (
                  <AudioComponent
                    key={remoteTrack.trackPublication.trackSid}
                    track={remoteTrack.trackPublication.audioTrack}
                  />
                )
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg mb-4">
          <p>안녕하세요! 이정준 님에 대한 면접 질문을 추천해 드릴게요!</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <button className="bg-gray-200 px-4 py-2 rounded flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h3v7h3v-7h3m10 0h-3v7h-3v-7h-3m10 0h-3v7h-3v-7h-3M13 7h7v7h-7z"
              ></path>
            </svg>
            음소거
          </button>
          <button
            onClick={handleStartSurvey}
            className="bg-gray-200 px-4 py-2 rounded flex items-center"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4h16v16H4z"
              ></path>
            </svg>
            평가
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            답변 제출하기
          </button>
        </div>
      </div>
    </div>
  );
}
