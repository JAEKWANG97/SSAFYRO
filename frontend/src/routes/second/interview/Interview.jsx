import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SecondNav from "../components/SecondNav.jsx";
import Filter from "../components/Filter.jsx";
import axios from "axios";
// 새로고침 아이콘 반응형으로 만들 css파일
import "./styles.css";
import Button from "../../../components/Button.jsx";

export default function Interview() {
  const [roomList, setRoomList] = useState([]);
  const [filteredRoomList, setFilteredRoomList] = useState([]);
  // 아이콘 회전 상태
  const [isRotating, setIsRotating] = useState(false);

  const navigate = useNavigate();

  const APIURL = "http://i11c201.p.ssafy.io:9999/api/v1/";

  const getRooms = async (
    type,
    capacity,
    page,
    size,
    title = null,
    status = null
  ) => {
    let filter = {
      type: type,
      capacity: capacity,
      page: page,
      size: size,
      title: title,
      status: status,
    };

    const response = await axios
      .get(APIURL + "rooms", { params: filter })
      .then((response) => {
        // console.log(response.data.response.rooms);
        setFilteredRoomList(response.data.response.rooms);
      })
      .catch((error) => {
        console.log(error);
        setFilteredRoomList([]);
        alert("방 목록을 불러오는데 실패했습니다.");
      });
  };

  // 방 타입 한글로 변환
  const typeKorean = {
    PRESENTATION: "PT",
    PERSONALITY: "인성",
  };

  // react useEffect Hook: 방 목록 불러오기
  useEffect(() => {
    getRooms(null, null, 1, 10, null, null);
  }, []);

  // 방 참여
  const handleJoinRoom = (id) => {
    const roomIndex = filteredRoomList.findIndex((room) => room.id === id);
    console.log("roomIndex: ", roomIndex);
    console.log("filteredRoomList:", filteredRoomList);
    if (
      roomIndex !== -1 &&
      filteredRoomList[roomIndex].status === "WAIT" &&
      filteredRoomList[roomIndex].participantCount <
        filteredRoomList[roomIndex].capacity
    ) {
      const updateRooms = [...filteredRoomList];
      setFilteredRoomList(updateRooms);
      navigate(`/second/interview/room/${id}`);
    } else {
      alert("현재 참여할 수 없는 방입니다.");
    }
  };

  // 필터 갱신
  const handleSearchClick = function (filter) {
    getRooms(
      filter.type ? filter.type : null,
      filter.capacity ? filter.capacity : null,
      filter.page,
      filter.size,
      filter.title ? filter.title : null,
      filter.status ? "WAIT" : null
    );
  };

  // 빠른 입장
  const handleQuickStart = async function (type) {
    await axios
      .get(APIURL + "rooms/fast-enter", {
        params: {
          type: type,
        },
      })
      .then((response) => {
        navigate(`/second/interview/room/${response.data.response.roomId}`);
      })
      .catch((error) => {
        console.log(error);
        alert("빠른 입장할 수 있는 스터디 방이 현재 존재하지 않습니다.");
      });
  };

  // 새로고침 핸들러
  const handleRefreshClick = () => {
    // 회전 시작
    setIsRotating(true);
    setTimeout(() => {
      // 회전 멈춤
      setIsRotating(false);
      window.location.reload();
    }, 1000); // 1초 후 새로고침
  };

  return (
    <>
      <SecondNav />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow p-4">
          <div className="container mx-auto">
            <div className="flex items-center mb-2">
              <h1 className="text-3xl font-bold mr-4">면접 스터디 모집</h1>
              <svg
                onClick={handleRefreshClick}
                xmlns="http://www.w3.org/2000/svg"
                className={`refresh-icon ${isRotating ? "rotating" : ""}`} // 클래스 조건부 추가
                viewBox="0 0 16 16"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.75 10.75h-3m12.5-2c0 3-2.798 5.5-6.25 5.5c-3.75 0-6.25-3.5-6.25-3.5v3.5m9.5-9h3m-12.5 2c0-3 2.798-5.5 6.25-5.5c3.75 0 6.25 3.5 6.25 3.5v-3.5"
                ></path>
              </svg>
            </div>
            <div className="flex gap-4 mb-4"> {/* 빠른 시작 및 방 생성 버튼들을 flex 컨테이너로 묶음 */}
              <button
                className="bg-violet-300 shadow rounded p-4 flex items-center justify-center text-violet-600 hover:bg-violet-400 hover:text-white"
                onClick={() => handleQuickStart("PRESENTATION")}
              >
                PT면접 빠른 시작
              </button>
              <button
                className="bg-emerald-300 shadow rounded p-4 flex items-center justify-center text-emerald-600 hover:bg-emerald-400 hover:text-white"
                onClick={() => handleQuickStart("PERSONALITY")}
              >
                인성면접 빠른 시작
              </button>
              <button
                onClick={() => navigate("/second/interview/createroom")}
                className="rounded p-4 flex items-center justify-center text-gray-400 hover:bg-gray-300"
              >
                + 방 생성
              </button>
            </div>
            <div className="bg-white p-2 shadow-2xl">
              <Filter onSearchClick={handleSearchClick} />
              <div className="flex justify-center">
                <hr className="w-[97%]" />
              </div>
              <div className="w-full px-4 mt-10">
                <div className="grid grid-cols-3 gap-10">
                  {filteredRoomList.map((room) => (
                    <div
                      key={room.id}
                      className="bg-white shadow rounded p-6 flex flex-col justify-between"
                      style={{ height: "270px" }}
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
                        <span className=" bg-purple-100 text-purple-800 text-xs font-medium py-1 px-2 rounded border border-purple-400">
                          {typeKorean[room.type]}
                        </span>
                      </div>
                      <div className="flex-grow mt-2">
                        <p className="text-gray-700 font-semibold">
                          {room.title}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {room.description}
                        </p>
                      </div>
                      <hr />
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
                          className="bg-blue-500 text-white py-1 px-2 rounded w-[60px]"
                          disabled={room.status !== "WAIT"}
                        >
                          참여
                        </button>
                        {/* <Button text="참여하기" type="SEARCHROOM" onClick={() => handleJoinRoom(room.id)} disabled={room.status !== "WAIT"}/> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
