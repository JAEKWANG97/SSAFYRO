// Room.jsx

import { useParams, useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "../../../components/Button";
import PreventRefresh from "../../components/PreventRefresh";
import InterviewTips from "./components/InterviewTips";
import userImg from "../../../../public/main/user.jpg";
// import userImg from "../../../../public/main/users.png";

export default function Room() {
  const { roomid } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const currentUser = { userId: 10, name: "Alice" }; // 더미 사용자 정보: 실제 유저 정보로 대체 필요

  const isInitialMount = useRef(true);

  useEffect(() => {
    // 방 정보 가져오기
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(
          `http://i11c201.p.ssafy.io:9999/api/v1/rooms/${roomid}`
        );
        const roomData = response.data.response;

        // 현재 사용자 중복 여부 확인
        const isUserAlreadyInRoom = roomData.userList.some(
          (participant) => participant.userId === currentUser.userId
        );

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
          console.log("현재 방 정보 : ", updatedRoomData);
          console.log("참가자 리스트 : ", updatedRoomData.userList);
        } else {
          setRoom(roomData);
          console.log("현재 방 정보 : ", roomData);
          console.log("참가자 리스트 : ", roomData.userList);
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

      // // 마지막 참가자가 방을 떠나면 서버에 방 삭제 요청
      // if (updatedRoom.userList.length === 0) {
      //   try {
      //     await axios.delete(`http://i11c201.p.ssafy.io:9999/api/v1/rooms/${roomid}`)
      //   } catch (error) {
      //     console.error("히히 삭제 못해", error)
      //   }
      // }
    }
  }

  if (!room) return <div>로딩 중 ...</div>;

  return (
    <div className="flex justify-center">
      {/* PreventRefresh 컴포넌트를 추가하여 새로고침 방지 기능 활성화 */}
      <PreventRefresh />
      <div
        className="w-full mt-16 overflow-hidden"
        style={{ minWidth: "1100px" }}
      >
        <div className="w-full h-[80vh] mx-auto mt-5 p-6 rounded-xl bg-white shadow-2xl">
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
            // style={{
            //   backgroundColor: "rgba(249, 250, 255, 1)",
            //   borderColor: "rgba(249, 250, 255, 1)",
            // }}
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

              <Chat
                currentUser={currentUser}
                currentRoom={roomid}
                messages={messages}
                setMessages={setMessages}
              />
            </div>
            <div className="w-[30%] flex flex-col justify-between">
                <InterviewTips />
              <div
                className="p-7 flex justify-center ml-3 mr-5"
                style={{ height: "25%" }}
              >
                {/* <button
                  className="w-full font-extrabold bg-blue-500 text-white px-4 py-2 rounded-3xl hover:bg-blue-600"
                  onClick={startInterviewHandler}
                >
                  면접 시작
                </button> */}
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
