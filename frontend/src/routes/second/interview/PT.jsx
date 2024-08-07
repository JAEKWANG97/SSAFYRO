import React, { useRef, useEffect, useCallback, useState } from "react";
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

// 발음 평가 API 모듈
// import { base64String, pronunciationEvaluation } from "./components/VoicePronunciationRecord";

// AuthStore에서 사용자 정보 가져오기
import useAuthStore from "../../../stores/AuthStore";

// 룸 컨트롤 모듈
// import { turnChange } from "./components/InterviewRules";

export default function PT() {
  // 방 정보 가져오기
  const { roomid } = useParams();

  // 유저 정보 가져오기
  const userInfo = useAuthStore((state) => state.userInfo);

  const navigate = useNavigate();

  const handleEndInterview = () => {
    leaveRoom();
    stop();
    navigate("/second/interview");
  };

  const handleStartSurvey = () => {
    navigate(`/second/interview/room/${roomid}/pt/survey`);
  };

  // OpenVidu 연결 코드입니다.
  // 참고 출처: https://openvidu.io/3.0.0-beta2/docs/tutorials/application-client/react/#understanding-the-code
  let APPLICATION_SERVER_URL =
    "http://i11c201.p.ssafy.io:9999/api/v1/openvidu/"; // Application 서버 주소
  let LIVEKIT_URL = "wss://i11c201.p.ssafy.io/"; // LiveKit 서버 주소
  const configureUrls = function () {
    if (!APPLICATION_SERVER_URL) {
      if (window.location.hostname === "localhost") {
        APPLICATION_SERVER_URL = "http://localhost:6080/";
      } else {
        APPLICATION_SERVER_URL =
          "https://" + window.location.hostname + ":6443/";
      }
    }

    if (!LIVEKIT_URL) {
      if (window.location.hostname === "localhost") {
        LIVEKIT_URL = "ws://localhost:7880/";
      } else {
        LIVEKIT_URL = "wss://" + window.location.hostname + ":7443/";
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
    // console.log(data.response.token);
    return data.response.token;
  };

  // OpenVidu 연결 종료
  const leaveRoom = async function () {
    // Leave the room by calling 'disconnect' method over the Room object
    await room?.disconnect();

    // Reset the state
    setRoom(undefined);
    setLocalTrack(undefined);
    setRemoteTracks([]);
  };

  // OpenVidu 변수 초기 선언
  const [room, setRoom] = useState(undefined);
  const [localTrack, setLocalTrack] = useState(undefined);
  const [remoteTracks, setRemoteTracks] = useState([]);

  const [participantName, setParticipantName] = useState(
    userInfo.userName + Math.floor(Math.random() * 100)
  );
  const [roomName, setRoomName] = useState(roomid);

  const joinRoom = async function () {
    const room = new Room(); // Initialize a now Room object
    setRoom(room);

    // Specify the actions when events take place in the room
    // On every new Track recived...
    room.on(RoomEvent.TrackSubscribed, (_track, publication, participant) => {
      setRemoteTracks((prev) => [
        ...prev,
        {
          trackPublication: publication,
          participantIdentity: participant.identity,
        },
      ]);
    });

    // On every Track destroyed...
    room.on(RoomEvent.TrackUnsubscribed, (_track, publication) => {
      setRemoteTracks((prev) =>
        prev.filter(
          (track) => track.trackPublication.trackSid !== publication.trackSid
        )
      );
    });

    try {
      // Get a token from your application server with the room name ane participant name
      // console.log(roomName, participantName);
      const token = await getToken(roomName, participantName);

      // Connect to the room with the LiveKit URL and the token
      await room.connect(LIVEKIT_URL, token);
      // console.log("Connected to the room", room.name);
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

  // useEffect가 불필요하게 실행되는 것으로 추정되어서, joinRoomTrigger로 joinRoom 함수가 최초 한 번만 실행되도록 제어합니다.
  let joinRoomTrigger = 1;

  useEffect(() => {    
    if (joinRoomTrigger === 1) {
      joinRoomTrigger = 0;
      joinRoom();
    }
  }, [joinRoomTrigger]);

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const recognitionRef = useRef(null);


  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'ko-KR';

    recognitionRef.current.onresult = (event) => {
      const current = event.resultIndex;
      console.log(event.results[current])
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    setIsListening(true);
    recognitionRef.current.start();
  }, []);

  const stopListening = useCallback(() => {
    setIsListening(false);
    recognitionRef.current.stop();
  }, []);

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
          <button
            onClick={isListening ? stopListening : startListening}
            className={`px-4 py-2 rounded ${isListening ? 'bg-red-500' : 'bg-green-500'} text-white`}
          >
            {isListening ? '인식 중지' : '인식 시작'}
          </button>
          {/* {isRendering.current  ? null : <><button onClick={listen({ lang: "ko-KR" })} > 인식시작</button>
          <button onClick={stop}> 인식종료</button></>} */}
          
        </div>
        <div className="flex justify-center mb-6">
          {/* OpenVidu 화상 회의 레이아웃 */}
          <div className="flex space-x-4 justify-between items-end">
            {localTrack && (
              <div>
                <VideoComponent
                  track={localTrack}
                  participantIdentity={participantName}
                  local={true}
                />
              </div>
            )}
            {remoteTracks.map((remoteTrack) =>
              remoteTrack.trackPublication.kind === "video" ? (
                <div>
                  <VideoComponent
                    key={remoteTrack.trackPublication.trackSid}
                    track={remoteTrack.trackPublication.videoTrack}
                    participantIdentity={remoteTrack.participantIdentity}
                  />
                </div>
              ) : (
                <AudioComponent
                  key={remoteTrack.trackPublication.trackSid}
                  track={remoteTrack.trackPublication.audioTrack}
                />
              )
            )}
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
      { transcript }
    </div>
  );
}
