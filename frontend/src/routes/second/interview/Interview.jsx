import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SecondNav from "../components/SecondNav.jsx";
import Filter from "../components/Filter.jsx";
import ErrorPage from "../../accounts/components/ErrorPage.jsx";
import personalityIcon from "../../../../public/main/personalityIcon2.png";
import presentationIcon from "../../../../public/main/presentationIcon.png";
import axios from "axios";
import "./styles.css";
import Swal from "sweetalert2";
import Button from "../../../components/Button.jsx";
import LoginAlert from "../../../components/LoginAlert.jsx";

export default function Interview() {
  const [roomList, setRoomList] = useState([]);
  const [filteredRoomList, setFilteredRoomList] = useState([]);
  const [isRotating, setIsRotating] = useState(false);
  const [error , SetError] = useState(null);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const APIURL = "https://i11c201.p.ssafy.io:8443/api/v1/";

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
      .get(APIURL + "rooms", {
        params: filter,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        setFilteredRoomList(response.data.response.rooms);
      })
      .catch((error) => {
        console.log(error);
        setFilteredRoomList([]);
        SetError(error);
        setStatus(error.response.status);
        console.log(error.response.status);
        // alert("방 목록을 불러오는데 실패했습니다.");
      });
  };

  const typeKorean = {
    PRESENTATION: "PT",
    PERSONALITY: "인성",
  };

  useEffect(() => {
    getRooms(null, null, 1, 10, null, null);
  }, []);

  const handleJoinRoom = (id) => {
    const roomIndex = filteredRoomList.findIndex((room) => room.id === id);
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

  const handleQuickStart = async function (type) {
    await axios
      .get(APIURL + "rooms/fast-enter", {
        params: {
          type: type,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        if(response.data.response.isExisting){
          navigate(`/second/interview/room/${response.data.response.roomId}`);
        } else {
          Swal.fire({
            title: "매칭 실패",
            text: "빠른 입장할 수 있는 스터디 방이 현재 존재하지 않습니다.",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "확인"
          });
        }      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRefreshClick = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
      window.location.reload();
    }, 1000);
  };

  if(error && status == 401){
    return <LoginAlert/>
  }
  else if(error){
    return(
      <ErrorPage/>
    )
  }

  return (
    <>
      <SecondNav />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow p-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold mr-4">면접 스터디 모집</h1>
                <svg
                  onClick={handleRefreshClick}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`refresh-icon ${isRotating ? "rotating" : ""}`}
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

              <div className="flex gap-4 mb-2">
              <button
                  className="shadow rounded p-4 flex items-center justify-center text-red-700 font-bold bg-red-100 hover:bg-red-400 hover:text-white"
                  onClick={() => handleQuickStart("PRESENTATION")}
                >
                  PT면접 빠른 시작
                </button>
                <button
                  className="bg-violet-100 shadow rounded p-4 flex items-center justify-center text-violet-700 font-bold hover:bg-violet-400 hover:text-white"
                  // style={{ backgroundColor: "rgba(198, 234, 246)" }}
                  onClick={() => handleQuickStart("PERSONALITY")}
                >
                  인성면접 빠른 시작
                </button>

                <button
                  onClick={() => navigate("/second/interview/createroom")}
                  className="bg-orange-100 rounded p-4 flex items-center justify-center text-orange-700 font-bold  hover:bg-orange-400 hover:text-white"
                >
                  + 방 생성
                </button>
              </div>
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
                      className="bg-white shadow rounded flex flex-col justify-between"
                      style={{ height: "300px" }}
                    >
                      {/* 머리 부분에 색상 추가 */}
                      <div
                        className={`${
                          room.type === "PERSONALITY"
                            ? "bg-violet-100"
                            : "bg-red-100"
                        } h-2 rounded-t`}
                      ></div>

                      <div className="p-6 flex flex-col flex-grow justify-start">
                        <div className="flex justify-between items-center mb-2">
                          <span
                            className={`${
                              room.type === "PERSONALITY"
                                // ? "bg-[#97DEFF] opacity-[30%] py-2 px-2 rounded-lg"
                                ? "bg-violet-100 text-violet-700 py-1 px-1 rounded-lg"
                                : "bg-red-100 py-1 px-1 rounded-lg"
                            } text-xs font-medium`}
                          >
                            {room.type === "PERSONALITY" ? (
                             <img
                             src={personalityIcon}
                             alt="personalityIcon"
                             className="w-6 h-6 p-1"
                           />
                         ) : (
                           <img
                             src={presentationIcon}
                             alt="presentationIcon"
                             className="w-6 h-6 p-1"
                           />
                            )}
                          </span>
                          <span
                            className={`text-sm bg-${
                              room.status === "WAIT" ? "green" : "red"
                            }-100 text-${
                              room.status === "WAIT" ? "green" : "red"
                            }-800 text-xs font-medium py-1 px-2 rounded`}
                          >
                            {room.status === "WAIT" ? "모집중" : "마감"}
                          </span>
                        </div>
                        <div className="flex-grow mt-2">
                          <p className="text-gray-700 font-semibold">
                            {room.title}
                          </p>
                          <p className="text-gray-500 text-sm mt-2">
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
                            className="bg-blue-400 text-white py-1 px-2 rounded w-[60px]"
                            disabled={room.status !== "WAIT"}
                          >
                            참여
                          </button>
                        </div>
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
