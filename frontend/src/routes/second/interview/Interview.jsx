import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { rooms } from "./data";
import SecondNav from "../components/SecondNav.jsx";
import Filter from "../components/Filter.jsx";

export default function Interview() {
  const [roomList, setRoomList] = useState([]);
  const [filteredRoomList, setFilteredRoomList] = useState([]); // 필터링된 방 목록 상태 추가
  // 필터링 정보 관리 상태 데이터
  const [filter, setFilter] = useState({
    selectedType: "",
    selectedParticipants: "",
    searchTerm: "",
    isRecruiting: false,
  });

  const navigate = useNavigate();
  const currentUser = { userId: "LGG", name: "Jun" };

  useEffect(() => {
    setRoomList(rooms);
    setFilteredRoomList(rooms); // 초기에는 모든 방을 표시
  }, []);

  const handleJoinRoom = (roomId) => {
    const roomIndex = filteredRoomList.findIndex((room) => room.roomId === roomId);
    if (roomIndex !== -1 && filteredRoomList[roomIndex].status === "open") {
      const updateRooms = [...filteredRoomList];
      updateRooms[roomIndex].participants.push(currentUser);
      setFilteredRoomList(updateRooms);
      navigate(`/second/interview/room/${roomId}`);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilter({ ...filter, [key]: value });
  };

  const handleSearchClick = () => {
    let filtered = roomList;

    // 면접 종류 필터링
    if (filter.selectedType) {
      filtered = filtered.filter((room) => room.type === filter.selectedType);
    }

    // 참여 인원 필터링
    if (filter.selectedParticipants) {
      filtered = filtered.filter(
        (room) => room.maxParticipants === parseInt(filter.selectedParticipants)
      );
    }

    // 검색어 필터링
    if (filter.searchTerm) {
      const lowerCaseSearchTerm = filter.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (room) =>
          room.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          room.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // 모집중 필터링
    if (filter.isRecruiting) {
      filtered = filtered.filter((room) => room.status === "open");
    }

    setFilteredRoomList(filtered); // 필터링된 결과 업데이트
  };

  return (
    <>
      <SecondNav />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold">모의 면접 방 목록</h1>
            <div className="flex">
              <Filter
                filter={filter}
                onFilterChange={handleFilterChange}
                onSearchClick={handleSearchClick}
              />
              <div className="w-3/4 px-4">
                <div className="grid grid-cols-3 gap-4">
                  {filteredRoomList.map((room) => ( // 필터링된 목록을 사용하여 렌더링
                    <div
                      key={room.roomId}
                      className="bg-white shadow rounded p-4 flex flex-col justify-between"
                      style={{ height: "200px" }} // 고정된 높이 설정
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
                      <div className="flex-grow">
                        <p className="text-gray-700 font-semibold">
                          {room.title}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {room.description}
                        </p>
                      </div>
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
