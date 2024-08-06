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

// openvidu 연결 코드
import { configureUrls, getToken, leaveRoom as leaveOpenviduRoom, joinRoom, localTrack, remoteTracks } from "./components/ConnectOpenvidu";

export default function Room() {
  const { roomid } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  const isInitialMount = useRef(true);

  useEffect(() => {
    // 방 정보 가져오기
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(
          `http://i11c201.p.ssafy.io:9999/api/v1/rooms/${roomid}`
        );
        const roomData = response.data.response;

        const isUserAlreadyInRoom = roomData.userList.some(participant => {
          return participant === currentUser.userId
        });

        if (!isUserAlreadyInRoom) {
          // 방에 참가한 사용자 서버에 알리기
          await axios.post(
            `http://i11c201.p.ssafy.io:9999/api/v1/rooms/enter`,
            { userId: currentUser.userId, roomId: roomid }
          );

          // 다시 방 정보 가져오기
          const updatedResponse = await axios.get(
            `http://i11c201.p.ssafy.io:9999/api/v1/rooms/${roomid}`
          );
          const updatedRoomData = updatedResponse.data.response;
          setRoom(updatedRoomData);
        } else {
          setRoom(roomData);
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
      if (room) {
        leaveRoom();
      }
    };
  }, []);

  // 방 나가기
  function navigateHandler() {
    leaveRoom();
    leaveOpenviduRoom();
    navigate("/second/interview");
  }

  // 면접 시작
  function startInterviewHandler() {
    // 면접 종류가 PT일 경우
    if (room.type === "PRESENTATION") {
      navigate(`/second/interview/room/${roomid}/pt_ready`);
    } else {
      // 면접 종류가 인성일 경우
      navigate(`/second/interview/room/${roomid}/pt`);
    }
  }

  async function leaveRoom() {
    if (room) {
      try {
        await axios.post(`http://i11c201.p.ssafy.io:9999/api/v1/rooms/exit`, {
          roomId: roomid,
          userId: currentUser.userId,
        });
        console.log("Successfully left the room"); // 나가기 성공 로그
      } catch (error) {
        console.error("히히 못가:", error);
      }

      const updatedRoom = { ...room };
      const participantIndex = updatedRoom.userList.findIndex(
        (participant) => participant.userId === currentUser.userId
      );

      if (participantIndex !== -1) {
        updatedRoom.userList.splice(participantIndex, 1);
        setRoom(updatedRoom);
      }
    }
  }

  // openvidu 연결
  let joinRoomTrigger = 1;
  useEffect(() => {
    if (joinRoomTrigger === 1) {
      joinRoomTrigger = 0;
      configureUrls();
      joinRoom(roomid, useAuthStore.userInfo.userName);
    }
  }, [joinRoomTrigger]);

  if (!room) return <div>로딩 중 ...</div>;

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
              {room.type === "PRESENTATION" ? "PT" : "인성"}
            </span>
            <div className="items-center">
              <h1 className="font-extrabold text-2xl">{room.title}</h1>
            </div>
            <Button
              text="나가기"
              type="WAITINGROOMOUT"
              onClick={navigateHandler}
            />
          </div>

          <div
            className="flex h-[95%] rounded-xl mt-4 bg-gray-50"
          >
            <div className="w-[70%] flex flex-col p-4">
              <div className="flex-grow rounded-lg p-1 flex items-center justify-between h-[50%]">
                {room.userList.map((participant, index) => (
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
                ))}
                {Array(room.capacity - room.userList.length)
                  .fill()
                  .map((_, index) => (
                    <div
                      key={index + room.userList.length}
                      className="w-[32%] h-[90%] bg-gray-200 rounded-lg flex flex-col items-center justify-center px-5"
                    >
                      {/* 빈자리 */}
                    </div>
                  ))}
                {Array(3 - Math.max(room.capacity, room.userList.length))
                  .fill()
                  .map((_, index) => (
                    <div
                      key={index + room.capacity + room.userList.length}
                      className="w-[32%] h-[90%] bg-gray-200 rounded-lg flex flex-col items-center justify-center px-5"
                    >
                      {/* 최대 수용 인원을 초과한 자리 X 표시 */}
                      <span className="text-2xl text-gray-400">X</span>
                    </div>
                  ))}
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
              <div
                className="p-7 flex justify-center items-center ml-3 mr-5"
              >
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
