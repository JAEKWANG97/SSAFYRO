// Room.jsx

import { useParams, useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../../components/Button";

export default function Room() {
  const { roomid } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  // const roomIndex = rooms.findIndex((room) => room.id === roomid);
  // const room = roomIndex !== -1 ? rooms[roomIndex] : null;
  const [messages, setMessages] = useState([]);
  const currentUser = { userId: 10, name: "Alice" };  // 더미 사용자 정보: 실제 유저 정보로 대체 필요

  // console.log(`roomid : ${roomid}`)
  useEffect(() => {
    // 방 정보 가져오기
    const fetchRoomDetails = async () => {
      try {
        // 방에 참가한 사용자 서버에 알리기
        await axios.post(`http://i11c201.p.ssafy.io:9999/api/v1/rooms/enter`, { userId: currentUser.userId, roomId: roomid });

        const response = await axios.get(`http://i11c201.p.ssafy.io:9999/api/v1/rooms/${roomid}`)
        setRoom(response.data.response)
        console.log(`현재 사용자 정보 : ${currentUser.userId}`)
        console.log('현재 방 정보 : ', response.data)
        console.log('참가자 리스트 : ', response.data.response.userList)

      } catch (error) {
        console.error(error);
        alert("방 정보를 불러오는데 실패했습니다.");
        navigate("/")
      }
    }

    fetchRoomDetails()

    return () => {
      if (room) {
        leaveRoom()
      }
    }
  }, [roomid]);

  // 방 나가기
  function navigateHandler() {
    leaveRoom();
    navigate("/second/interview");
  }

  // 면접 시작
  function startInterviewHandler() {
    navigate(`/second/interview/room/${roomid}/pt_ready`);
  }

  async function leaveRoom() {
    if (room) {
      try {
        await axios.post(`http://i11c201.p.ssafy.io:9999/api/v1/rooms/exit`, { roomId: roomid, userId: currentUser.userId});
      } catch (error) {
        console.error("히히 못가:", error)
      }

      const updatedRoom = {...room}
      const participantIndex = updatedRoom.userList.findIndex(
        (participant) => participant.userId === currentUser.userId
      )

      if (participantIndex !== -1) {
        updatedRoom.userList.splice(participantIndex, 1)
        setRoom(updatedRoom)
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

  if (!room) return <div>로딩 중 ...</div>

  return (
    <div className="flex justify-center">
      <div
        className="w-full mt-16 overflow-hidden"
        style={{ minWidth: "1100px" }}
      >
        <div className="w-full h-[80vh] mx-auto mt-5 p-6 rounded-xl bg-white shadow-2xl">
          <div className="flex justify-between items-center mb-2">
            <div className="flex">
              <img
                className="h-[25px] pr-4 mt-1"
                src="/SSAFYRO.png"
                alt="SSAFYRO 로고"
              />
              <p className="font-extrabold text-2xl">SSAFYRO</p>
            </div>
            <div className="items-center">
              <h1 className="font-extrabold text-2xl">{room.title}</h1>
            </div>
            {/* <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              onClick={navigateHandler}
            >
              나가기
            </button> */}
            <Button 
            text="나가기" type="WAITINGROOMOUT" onClick={navigateHandler}/>
          </div>

          <div
            className="flex h-[95%] border rounded-xl mt-4"
            style={{
              backgroundColor: "rgba(249, 250, 255, 1)",
              borderColor: "rgba(249, 250, 255, 1)",
            }}
          >
            <div className="w-[70%] flex flex-col p-4">
              <div className="flex-grow rounded-lg p-1 flex items-center justify-between h-[50%]">
                {room.userList.map((participant, index) => (
                  <div
                    key={index}
                    className="w-[32%] h-[90%] bg-gray-200 rounded-lg flex flex-col items-center justify-center px-5"
                  >
                    <img
                      src="/main/users.png"
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
              <div
                className="p-5 bg-white shadow-md rounded-xl ml-3 mr-5 mt-8"
                style={{ height: "1000px" }}
              >
                <div className="flex items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2.0em"
                    height="2.0em"
                    viewBox="0 0 48 48"
                    className="text-blue-500"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18.005 43.5h12.188m-19.5-28.667C12.429 8.353 17.39 4.5 24.099 4.5s11.67 3.852 13.406 10.333s-1.502 13.125-7.312 16.48v7.312H18.005v-7.312c-7.65-3.654-9.049-10-7.312-16.48"
                    ></path>
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.28 18.296s-.786-8.599 9.888-9.982"
                    ></path>
                  </svg>
                  <h2 className="flex-grow text-2xl font-bold ml-2">
                    선배들의 Tip!
                  </h2>
                </div>
                <div className="flex items-start mt-8 px-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white flex items-center justify-center rounded-full mr-2">
                    1
                  </div>
                  <p className="px-2 text-gray-700">
                    완벽하게 말할 필요 없어요! 자신이 생각한 바를 면접관이
                    이해할 수 있을 정도로만 전달할 수 있으면 되요!
                  </p>
                </div>
              </div>
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
                text="면접 시작" type="WAITINGROOMSTART" onClick={startInterviewHandler}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
