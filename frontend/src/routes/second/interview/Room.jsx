import { useParams, useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "../../../components/Button";
import PreventRefresh from "../../components/PreventRefresh";
import InterviewTips from "./components/InterviewTips";
import userImg from "../../../../public/main/user.jpg";
// import userImg from "../../../../public/main/users.png";
import { currentUser } from "./data"; // 더미 사용자 정보: 실제 유저 정보로 대체 필요
// user 정보 가져오기
import useAuthStore from "../../../stores/AuthStore";
// zustand 스토어 임포트
import useRoomStore from "../../../stores/useRoomStore";

// openvidu 연결 코드
import {
  LocalVideoTrack,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
  TrackPublication,
} from "livekit-client";
// openvidu video, audio component 불러오기
import AudioComponent from "./components/AudioComponent";
import VideoComponent from "./components/VideoComponent";

// interviewStore 불러오기
import useInterviewStore from "../../../stores/InterviewStore";

export default function WaitRoom() {
  const { roomid } = useParams();
  const navigate = useNavigate();
  const [waitRoom, setWaitRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  // zustand store의 setUserList 사용
  const { setUserList } = useRoomStore();
  const isInitialMount = useRef(true);

  const { setRoomType } = useInterviewStore();

  useEffect(() => {
    // 방 정보 가져오기
    const fetchRoomDetails = async () => {
      try {
        const token = localStorage.getItem("Token");
        console.log("Retrieved Token: ", token);

        const response = await axios.get(
          `http://i11c201.p.ssafy.io:9999/api/v1/rooms/${roomid}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then((res) => {
          setRoomType(res.data.response.type);
        });

        const roomData = response.data.response;

        const isUserAlreadyInRoom = roomData.userList.some((participant) => {
          return participant === currentUser.userId;
        });

        if (!isUserAlreadyInRoom) {
          // 방에 참가한 사용자 서버에 알리기
          await axios.post(
            `http://i11c201.p.ssafy.io:9999/api/v1/rooms/enter`,
            { roomId: roomid },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // 다시 방 정보 가져오기
          const updatedResponse = await axios.get(
            `http://i11c201.p.ssafy.io:9999/api/v1/rooms/${roomid}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const updatedRoomData = updatedResponse.data.response;
          setWaitRoom(updatedRoomData);
          // zustand store에 userList 저장
          setUserList(updatedRoomData.userList);
          console.log("참여자 정보: ", updatedRoomData.userList);
        } else {
          setWaitRoom(roomData);
          setUserList(roomData.userList);
          console.log("참여자 정보: ", roomData.userList);
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
      if (waitRoom) {
        leaveRoom();
      }
    };
  }, []);

  // 방 나가기
  function navigateHandler() {
    leaveRoom();
    openviduLeaveRoom();
    navigate("/second/interview");
  }

  // 면접 시작
  function startInterviewHandler() {
    // 일단 임시로 들어왔던 openvidu 방을 나가게 하고
    openviduLeaveRoom();
    // 면접 종류가 PT일 경우
    if (waitRoom.type === "PRESENTATION") {
      navigate(`/second/interview/room/${roomid}/pt_ready`);
    } else {
      // 면접 종류가 인성일 경우
      navigate(`/second/interview/room/${roomid}/pt`);
    }
  }

  // User Token 가져오기
  const token = localStorage.getItem("Token");
  console.log("Stored Token : ", token);
  async function leaveRoom() {
    if (waitRoom) {
      try {
        await axios.post(
          `http://i11c201.p.ssafy.io:9999/api/v1/rooms/exit`,
          {
            roomId: roomid,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Successfully left the room"); // 나가기 성공 로그
      } catch (error) {
        console.error("히히 못가:", error);
      }

      const updatedRoom = { ...waitRoom };
      const participantIndex = updatedRoom.userList.findIndex(
        (participant) => participant.userId === currentUser.userId
      );

      if (participantIndex !== -1) {
        updatedRoom.userList.splice(participantIndex, 1);
        setWaitRoom(updatedRoom);
        // zustand store 업데이트
        setUserList(updatedRoom.userList);
      }
    }
  }

  // openvidu 연결
  const [room, setRoom] = useState(undefined);
  const [localTrack, setLocalTrack] = useState(undefined);
  const [remoteTracks, setRemoteTracks] = useState([]);

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
    // console.log(data.response.token);
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
      // Get a token from your application server with the room name ane participant name
      // console.log(roomName, participantName);
      const token = await getOpenviduToken(roomId, userName);

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

  // 트랙을 그룹화하여 참가자별로 오디오 및 비디오 트랙을 함께 렌더링
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
      {/* PreventRefresh 컴포넌트를 추가하여 새로고침 방지 기능 활성화 */}
      <PreventRefresh />
      <div
        className="w-full mt-8 mb-8 overflow-hidden"
        style={{ minWidth: "1100px" }}
      >
        <div className="w-full h-[85vh] mx-auto mt-6 p-6 rounded-xl bg-white shadow-2xl">
          <div className="flex justify-between items-center mb-2">
            <span className=" text-indigo-800 text-2xl font-extrabold px-6 pt-2 pb-1 rounded  dark:text-indigo-300 border border-indigo-300">
              {waitRoom.type === "PRESENTATION" ? "PT" : "인성"}
            </span>
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
                        // key={remoteTrack.trackPublication.trackSid}
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
                {/* 참가자가 없을 때 빈 div를 렌더링 */}
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
                {/* {room.userList.map((participant, index) => (
                  <div
                    key={index}
                    className="w-[32%] h-[90%] bg-gray-200 rounded-lg flex flex-col items-center justify-center px-5"
                  >
                    <img
                      src={userImg}
                      alt="User"
                      className="h-2/3 object-contain rounded-full"
                    />
                    <span className="text-sm font-bold mt-2">
                      {participant}
                    </span>
                  </div>
                ))} */}
                {/* {Array(waitRoom.capacity - waitRoom.userList.length)
                  .fill()
                  .map((_, index) => (
                    <div
                      key={index + waitRoom.userList.length}
                      className="w-[32%] h-[90%] bg-gray-200 rounded-lg flex flex-col items-center justify-center px-5"
                    >
                    </div>
                  ))} */}
                {/* {Array(3 - Math.max(waitRoom.capacity, waitRoom.userList.length))
                  .fill()
                  .map((_, index) => (
                    <div
                      key={index + waitRoom.capacity + waitRoom.userList.length}
                      className="w-[32%] h-[90%] bg-gray-200 rounded-lg flex flex-col items-center justify-center px-5"
                    >
                      <span className="text-2xl text-gray-400">X</span>
                    </div>
                  ))} */}
              </div>
              <InterviewTips />
            </div>
            <div className="w-[30%] flex flex-col justify-between">
              <Chat
                currentUser={currentUser}
                currentRoom={roomid}
                messages={messages}
                setMessages={setMessages}
              />
              <div className="p-7 flex justify-center items-center ml-3 mr-5">
                <Button
                  text="면접 시작"
                  type="WAITINGROOMSTART"
                  onClick={startInterviewHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
