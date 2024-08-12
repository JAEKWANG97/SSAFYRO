import { useParams, useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "../../../components/Button";
import PreventRefresh from "../../components/PreventRefresh";
import InterviewTips from "./components/InterviewTips";
import interviewIcon from "../../../../public/main/interviewIcon.png";
import useAuthStore from "../../../stores/AuthStore"; // user 정보 가져오기
import useRoomStore from "../../../stores/useRoomStore"; // zustand 스토어 임포트
import {
  LocalVideoTrack,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
  TrackPublication,
} from "livekit-client"; // openvidu 연결 코드
import AudioComponent from "./components/AudioComponent"; // openvidu video, audio component 불러오기
import VideoComponent from "./components/VideoComponent";
import useInterviewStore from "../../../stores/InterviewStore"; // interviewStore 불러오기
import { Client } from "@stomp/stompjs";

export default function WaitRoom() {
  const { roomid } = useParams();
  const navigate = useNavigate();
  const [waitRoom, setWaitRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const { setUserList } = useRoomStore(); // zustand store의 setUserList 사용
  const isInitialMount = useRef(true);
  const { setRoomType } = useInterviewStore();
  const interviewClient = useRef(null); // WebSocket client 추가

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const token = localStorage.getItem("Token");
        // console.log("Retrieved Token: ", token);

        const response = await axios.get(
          `https://i11c201.p.ssafy.io:8443/api/v1/rooms/${roomid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRoomType(response.data.response.type);
        const roomData = response.data.response;
        // console.log("roomData : ", roomData);
        // console.log("userInfo.userId : ", userInfo.userId);

        const isUserAlreadyInRoom = roomData.userList.some((participant) => {
          return participant === userInfo.userId;
        });

        if (!isUserAlreadyInRoom) {
          await axios.post(
            `https://i11c201.p.ssafy.io:8443/api/v1/rooms/enter`,
            { roomId: roomid },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const updatedResponse = await axios.get(
            `https://i11c201.p.ssafy.io:8443/api/v1/rooms/${roomid}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const updatedRoomData = updatedResponse.data.response;
          setWaitRoom(updatedRoomData);
          setUserList(updatedRoomData.userList);
          // console.log("updatedRoomData : ", updatedRoomData);
          // console.log("참여자 정보: ", updatedRoomData.userList);
        } else {
          setWaitRoom(roomData);
          setUserList(roomData.userList);
          // console.log("참여자 정보: ", roomData.userList);
        }
      } catch (error) {
        console.error(error);
        alert("방 정보를 불러오는데 실패했습니다.");
        navigate("/");
      }
    };

    if (isInitialMount.current) {
      fetchRoomDetails();
      isInitialMount.current = false;
    }

    return () => {
      if (interviewClient.current) {
        interviewClient.current.deactivate(); // 컴포넌트 언마운트 시 webSocket 연결 종료
      }
      if (waitRoom) {
        leaveRoom();
      }
    };
  }, []);

  useEffect(() => {
    if (waitRoom) {
      initializeStompClient();
    }
  }, [waitRoom]);

  function initializeStompClient() {
    const client = new Client({
      brokerURL: "ws://i11c201.p.ssafy.io:9999/ssafyro-chat", // STOMP 서버 URL
      onConnect: () => {
        // console.log("STOMP client connected");

        client.subscribe(`/topic/interview/${roomid}`, (message) => {
          const parsedMessage = JSON.parse(message.body);
          if (parsedMessage.nowStage === "FIRST") {
            startInterviewHandler();
          }
        });
      },
      onDisconnect: () => {
        // console.log("STOMP client disconnected");
      },
    });
    client.activate();
    interviewClient.current = client;
  }

  const sendInterviewStartMessage = () => {
    // console.log("1. sendInterviewStartMessage 실행")
    // console.log("1. interviewClient.current 값 확인 : ", interviewClient.current)
    if (interviewClient.current) {
      interviewClient.current.publish({
        destination: `/interview/turn/${roomid}`,
        body: JSON.stringify({
          nowStage: "FIRST",
        }),
      });
    }
  };

  // 방 나가기
  function navigateHandler() {
    leaveRoom();
    openviduLeaveRoom();

    // STOPM 클라이언트 연결 종료
    if (interviewClient.current) {
      interviewClient.current.deactivate();
    }

    navigate("/second/interview");
  }

  // 면접 시작
  function startInterviewHandler() {
    // waitRoom이 null인지 확인
    if (!waitRoom) {
      console.error("startInterviewHandler 호출 시 waitRoom이 null입니다.");
      // 일정 시간 대기 후 다시 시도
      // setTimeout(startInterviewHandler, 100); // 100ms 대기 후 다시 시도
      return;
    }

    // waitRoom.type이 정의되지 않은 경우
    if (!waitRoom.type) {
      console.error(
        "startInterviewHandler 호출 시 waitRoom.type이 정의되지 않았습니다."
      );
      return;
    }

    openviduLeaveRoom();
    if (waitRoom.type === "PRESENTATION") {
      navigate(`/second/interview/room/${roomid}/pt_ready`);
    } else {
      navigate(`/second/interview/room/${roomid}/pt`);
    }
  }

  // User Token 가져오기
  const token = localStorage.getItem("Token");
  // console.log("Stored Token : ", token);

  async function leaveRoom() {
    if (waitRoom) {
      try {
        await axios.post(
          `https://i11c201.p.ssafy.io:8443/api/v1/rooms/exit`,
          {
            roomId: roomid,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("Successfully left the room"); // 나가기 성공 로그
      } catch (error) {
        console.error("히히 못가:", error);
      }

      const updatedRoom = { ...waitRoom };
      // console.log("updatedRoom: ", updatedRoom);
      const participantIndex = updatedRoom.userList.findIndex(
        (participant) => participant === userInfo.userId
      );

      if (participantIndex !== -1) {
        updatedRoom.userList.splice(participantIndex, 1);
        setWaitRoom(updatedRoom);
        setUserList(updatedRoom.userList);
      }
    }
  }

  const [room, setRoom] = useState(undefined);
  const [localTrack, setLocalTrack] = useState(undefined);
  const [remoteTracks, setRemoteTracks] = useState([]);

  let APPLICATION_SERVER_URL =
    "https://i11c201.p.ssafy.io:8443/api/v1/openvidu/"; // Application 서버 주소
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

  const userInfo = useAuthStore((state) => state.userInfo);

  const getOpenviduToken = async function (roomId, userName) {
    const response = await fetch(APPLICATION_SERVER_URL + "token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomName: roomId,
        participantName: userName,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to get token: ${error.errorMessage}`);
    }

    const data = await response.json();
    return data.response.token;
  };

  const openviduLeaveRoom = async function () {
    await room?.disconnect();
    setRoom(undefined);
    setLocalTrack(undefined);
    setRemoteTracks([]);
  };

  const joinRoom = async function (roomId, userName) {
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
      const token = await getOpenviduToken(roomId, userName);
      await room.connect(LIVEKIT_URL, token);
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
      await openviduLeaveRoom();
    }
  };

  let joinRoomTrigger = 1;

  useEffect(() => {
    if (joinRoomTrigger === 1) {
      joinRoomTrigger = 0;
      joinRoom(roomid, userInfo.userName + Math.floor(Math.random() * 101));
    }
  }, [joinRoomTrigger]);

  if (!waitRoom) return <div>로딩 중 ...</div>;

  const groupedTracks = remoteTracks.reduce((acc, track) => {
    const participant = track.participantIdentity;
    if (!acc[participant]) {
      acc[participant] = { audio: null, video: null };
    }
    if (track.trackPublication.kind === "video") {
      acc[participant].video = track;
    } else if (track.trackPublication.kind === "audio") {
      acc[participant].audio = track;
    }
    return acc;
  }, {});

  const emptyDivs = Array(2 - Object.keys(groupedTracks).length).fill(null);

  return (
    <div className="flex flex-col justify-center items-center">
      <PreventRefresh />
      <div
        className="w-full mt-8 mb-8 overflow-hidden"
        style={{ minWidth: "1100px" }}
      >
        <div className="w-full h-[85vh] mx-auto mt-6 p-6 rounded-xl bg-white shadow-2xl">
          <div className="flex justify-between items-center mb-2">
            <div className="flex">
              <img src={interviewIcon} alt="" className="h-10 w-10"/>
              <span className=" text-indigo-300 text-2xl font-extrabold px-4 pt-2 pb-1 rounded dark:text-indigo-300">
                {waitRoom.type === "PRESENTATION" ? "PT" : "인성"}
              </span>
            </div>
            <div className="items-center">
              <h1 className="font-extrabold text-2xl">{waitRoom.title}</h1>
            </div>
            <Button
              text="나가기"
              type="WAITINGROOMOUT"
              onClick={navigateHandler}
            />
          </div>

          <div className="flex h-[95%] rounded-xl mt-4 bg-gray-50">
            <div className="w-[70%] flex flex-col p-4">
              <div className="flex-grow rounded-lg p-1 flex items-center justify-between h-[50%]">
                <div className="w-[32%] h-[90%] rounded-lg flex flex-col items-center justify-center">
                  {localTrack && (
                    <div className="w-full h-full">
                      <VideoComponent
                        track={localTrack}
                        participantIdentity={userInfo.userName}
                        local={true}
                      />
                    </div>
                  )}
                </div>
                {Object.entries(groupedTracks).map(([participant, tracks]) => (
                  <div
                    key={participant}
                    className="w-[32%] h-[90%] rounded-lg flex flex-col items-center justify-center"
                  >
                    {tracks.video && (
                      <VideoComponent
                        track={tracks.video.trackPublication.videoTrack}
                        participantIdentity={participant}
                        local={false}
                      />
                    )}
                    {tracks.audio && (
                      <AudioComponent
                        track={tracks.audio.trackPublication.audioTrack}
                      />
                    )}
                  </div>
                ))}
                {emptyDivs.map((_, index) => (
                  <div
                    key={index}
                    className="w-[32%] h-[90%] bg-gray-200 rounded-2xl flex flex-col items-center justify-center"
                  >
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No participant
                    </div>
                  </div>
                ))}
              </div>
              <InterviewTips interviewType={waitRoom.type} />
            </div>
            <div className="w-[30%] flex flex-col justify-between">
              <Chat
                currentUser={userInfo}
                currentRoom={roomid}
                messages={messages}
                setMessages={setMessages}
              />
              <div className="p-7 flex justify-center items-center ml-3 mr-5">
                <Button
                  text="면접 시작"
                  type="WAITINGROOMSTART"
                  onClick={sendInterviewStartMessage} // 면접 시작 메시지 전송
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
