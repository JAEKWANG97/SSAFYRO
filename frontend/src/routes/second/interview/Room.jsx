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

        const isUserAlreadyInRoom = roomData.userList.some((participant) => {
          return participant === currentUser.userId;
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
          <div className="flex justify-start items-center mb-2 space-x-4">
            {/* <Button
              text={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10px"
                  height="10px"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="currentColor"
                    d="M340.864 149.312a30.59 30.59 0 0 0 0 42.752L652.736 512L340.864 831.872a30.59 30.59 0 0 0 0 42.752a29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
                  ></path>
                </svg>
              }
              type="WAITINGROOMOUT"
              onClick={navigateHandler}
            /> */}
            <button
              onClick={navigateHandler}
              className="w-12 h-12 mr-3 bg-blue-100 text-blue-800 rounded-lg flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g fill="none" fillRule="evenodd">
                  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                  <path
                    fill="currentColor"
                    d="M8.293 12.707a1 1 0 0 1 0-1.414l5.657-5.657a1 1 0 1 1 1.414 1.414L10.414 12l4.95 4.95a1 1 0 0 1-1.414 1.414z"
                  ></path>
                </g>
              </svg>
            </button>
            <div className="items-center">
              <h1 className="font-extrabold text-2xl mr-3">{room.title}</h1>
            </div>
            <span className="flex items-center bg-blue-100 text-sm font-bold px-5 pt-1 pb-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="text-blue-600"
              >
                <path d="M18 21a8 8 0 0 0-16 0"></path>
                <circle cx={10} cy={8} r={5}></circle>
                <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
              </svg>
              <span className="ml-2">
                {room.type === "PRESENTATION" ? "PT" : "인성"}
              </span>
            </span>
          </div>
        
          <div className="flex h-[95%] w-[70%] rounded-xl mt-4 bg-gray-50">
            <div className="flex flex-col p-4">
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
            {/* <div className="w-[30%] flex flex-col justify-start">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
