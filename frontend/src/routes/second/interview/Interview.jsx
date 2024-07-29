import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { rooms } from "./data";
import SecondNav from "../components/SecondNav.jsx";
import Filter from "../components/Filter.jsx";

// import axios
import axios from "axios";

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

  // axios로 방 목록 불러오기

  // const APIURL = "http://i11c201.p.ssafy.io:8080/api/v1/";

  // const [rooms, setRooms] = useState([]);

  // const getRooms = async () => {
  //   let filter = {
  //     type: "PT",
  //     capacity: "3",
  //     page: 1,
  //     size: 10,
  //   };

  //   const response = await axios
  //     .get(APIURL + "rooms", { params: filter })
  //     .then((response) => {
  //       setRooms(response.rooms);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       alert("방 목록을 불러오는데 실패했습니다.");
  //     });
  // };

  // 영어로 들어오는 방 Type를 한글로 변환
  const typeKorean = {
    PRESENTATION: "PT",
    PERSONALITY: "인성",
  };

  useEffect(() => {
    // 데이터 로딩
    // axios로 API에서 불러오기

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
            <h1 className="text-3xl font-bold mb-12">모의 면접 방 목록</h1>
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
                            room.status === "WAIT" ? "green" : "red"
                          }-100 text-${
                            room.status === "WAIT" ? "green" : "red"
                          }-800 text-xs font-medium py-1 px-2 rounded border border-${
                            room.status === "WAIT" ? "green" : "red"
                          }-400`}
                        >
                          {room.status === "WAIT" ? "모집중" : "마감"}
                        </span>
                        <span className="text-sm bg-purple-100 text-purple-800 text-xs font-medium py-1 px-2 rounded border border-purple-400">
                          {typeKorean[room.type]}
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
                            {room.participantCount} / {room.capacity}
                          </span>
                        </div>
                        <button
                          onClick={() => handleJoinRoom(room.id)}
                          className="bg-blue-600 text-white mr-2 py-1 px-2 rounded w-[60px]"
                          disabled={room.status !== "WAIT"}
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
