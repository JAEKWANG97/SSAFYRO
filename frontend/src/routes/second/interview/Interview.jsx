// Interview.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { rooms } from "./data";
import SecondNav from "../components/SecondNav.jsx";

// import axios
import axios from "axios";

export default function Interview() {
  const [roomList, setRoomList] = useState([]);
  const navigate = useNavigate();
  const currentUser = { userId: "LGG", name: "Jun" }; // 현재 로그인한 사용자 정보

  // 방 목록 불러오기
  // const [rooms, setRooms] = useState([]);

  // const getRooms = async () => {
  //   let filter = {
  //     type: "all",
  //     capacity: "all",
  //   };

  //   const response = await axios
  //     .get("http://localhost:8000/api/rooms/")
  //     .then((response) => {
  //       setRooms(response.rooms);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       alert("방 목록을 불러오는데 실패했습니다.");
  //     });
  // };

  useEffect(() => {
    // 데이터 로딩
    // axios로 API에서 불러오기

    setRoomList(rooms);
  }, []);

  const handleJoinRoom = (roomId) => {
    const roomIndex = roomList.findIndex((room) => room.roomId === roomId);
    if (roomIndex !== -1 && roomList[roomIndex].status === "open") {
      const updateRooms = [...roomList];
      updateRooms[roomIndex].participants.push(currentUser);
      setRoomList(updateRooms);
      navigate(`/second/interview/room/${roomId}`);
    }
  };

  return (
    <>
      <SecondNav />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-12">모의 면접 방 목록</h1>
            <div className="flex">
              {/* 검색 필터 */}
              <div className="w-1/4 p-4 bg-white shadow rounded">
                <div className="mb-4">
                  <label className="block mb-2">면접 종류 선택</label>
                  <select className="w-full border p-2 rounded bg-gray-50">
                    <option>전체</option>
                    <option>인성 면접</option>
                    <option>PT 면접</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">참여 인원 선택</label>
                  <select className="w-full border p-2 rounded bg-gray-50">
                    <option>전체</option>
                    <option>1명</option>
                    <option>2명</option>
                    <option>3명</option>
                  </select>
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    모집중
                  </label>
                </div>
                <button className="w-full bg-blue-600 text-white p-2 rounded">
                  검색하기
                </button>
              </div>
              <div className="w-3/4 px-4">
                <div className="grid grid-cols-3 gap-4">
                  {roomList.map((room) => (
                    <div
                      key={room.roomId}
                      className="bg-white shadow rounded p-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span
                          className={`text-sm bg-${
                            room.status === "open" ? "green" : "red"
                          }-100 text-${
                            room.status === "open" ? "green" : "red"
                          }-800 text-xs font-medium py-1 px-2 rounded border border-${
                            room.status === "open" ? "green" : "red"
                          }-400`}
                        >
                          {room.status === "open" ? "모집중" : "마감"}
                        </span>
                        <span className="text-sm bg-purple-100 text-purple-800 text-xs font-medium py-1 px-2 rounded border border-purple-400">
                          {room.type}
                        </span>
                      </div>
                      <p className="text-gray-700 font-semibold">
                        {room.title}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {room.description}
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <div>
                          <img
                            className="w-[24px] inline mr-2"
                            src="/Interview/group.png"
                            alt="group icon"
                          />
                          <span className="text-sm text-gray-600">
                            {room.participants.length} / {room.maxParticipants}
                          </span>
                        </div>
                        <button
                          onClick={() => handleJoinRoom(room.roomId)}
                          className="bg-blue-600 text-white mr-2 py-1 px-2 rounded w-[60px]"
                          disabled={room.status !== "open"}
                        >
                          참여
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => navigate("/second/interview/createroom")}
                    className="bg-white shadow rounded p-4 flex items-center justify-center text-gray-400 hover:bg-gray-300"
                  >
                    + 방 생성
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
