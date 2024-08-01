// Interview.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SecondNav from "../components/SecondNav.jsx";
import Filter from "../components/Filter.jsx";
import axios from "axios";

export default function Interview() {
  const [roomList, setRoomList] = useState([]);
  const [filteredRoomList, setFilteredRoomList] = useState([]); // 필터링된 방 목록 상태 추가
  const [filter, setFilter] = useState({
    selectedType: "",
    selectedParticipants: "",
    searchTerm: "",
    isRecruiting: false,
  });

  const navigate = useNavigate();
  const currentUser = { userId: "LGG", name: "Jun" };

  const APIURL = "http://i11c201.p.ssafy.io:9999/api/v1/";

  const getRooms = async () => {
    let filter = {
      type: "PRESENTATION",
      capacity: "3",
      page: 1,
      size: 10,
    };

    const response = await axios
      .get(APIURL + "rooms", { params: filter })
      .then((response) => {
        console.log(response.data.response.rooms);
        setFilteredRoomList(response.data.response.rooms);
      })
      .catch((error) => {
        console.log(error);
        setFilteredRoomList([]);
        alert("방 목록을 불러오는데 실패했습니다.");
      });
  };

  const typeKorean = {
    PRESENTATION: "PT",
    PERSONALITY: "인성",
  };

  useEffect(() => {
    getRooms();
  }, []);

  const handleJoinRoom = (id) => {
    const roomIndex = filteredRoomList.findIndex((room) => room.id === id);
    console.log("roomIndex: ", roomIndex)
    console.log("filteredRoomList:", filteredRoomList)
    if (roomIndex !== -1 && filteredRoomList[roomIndex].status === "WAIT") {
      const updateRooms = [...filteredRoomList];
      // 위의 console.log에서는 잘 찍히는데 여기에서는 undefined가 떠.. 뭐가 문제인거야?
      // console.log(updateRooms[roomIndex].userList);
      // updateRooms[roomIndex].userList.push(currentUser);
      setFilteredRoomList(updateRooms);
      navigate(`/second/interview/room/${id}`);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilter({ ...filter, [key]: value });
  };

  const handleSearchClick = () => {
    let filtered = roomList;

    if (filter.selectedType) {
      filtered = filtered.filter((room) => room.type === filter.selectedType);
    }

    if (filter.selectedParticipants) {
      filtered = filtered.filter(
        (room) => room.maxParticipants === parseInt(filter.selectedParticipants)
      );
    }

    if (filter.searchTerm) {
      const lowerCaseSearchTerm = filter.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (room) =>
          room.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          room.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    if (filter.isRecruiting) {
      filtered = filtered.filter((room) => room.status === "WAIT");
    }

    setFilteredRoomList(filtered);
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
                  {filteredRoomList.map((room) => (
                    <div
                      key={room.id}
                      className="bg-white shadow rounded p-4 flex flex-col justify-between"
                      style={{ height: "200px" }}
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
