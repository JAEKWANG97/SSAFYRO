// Interview.jsx
import axios from "axios";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Interview() {
  const [roomList, setRoomList] = useState([]);
  const navigate = useNavigate();
  const currentUser = { userId: 'LGG', name: 'Jun' }; // 현재 로그인한 사용자 정보

  useEffect(() => {
    // 데이터 로딩
    setRoomList(rooms);
  }, []);

  const handleJoinRoom = (roomId) => {
    const roomIndex = roomList.findIndex((room) => room.roomId === roomId)
    if (roomIndex !== -1 && roomList[roomIndex].status === 'open') {
      const updateRooms = [...roomList]
      updateRooms[roomIndex].participants.push(currentUser)
      setRoomList(updateRooms)
      navigate(`/second/interview/room/${roomId}`);
    }
  };

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

  // 더미 데이터로 테스트
  const rooms = [
    {
      id: 1,
      title: "인성 면접 연습방",
      description: "인성 면접 연습방입니다.",
      type: "인성",
      capacity: 3,
    },
    {
      id: 2,
      title: "PT 면접 연습방",
      description: "PT 면접 연습방입니다.",
      type: "PT",
      capacity: 2,
    },
    {
      id: 3,
      title: "면접 연습 하실분",
      description: "아무나 환영",
      type: "PT",
      capacity: 3,
    },
    {
      id: 4,
      title: "비전공자도 할 수 있다",
      description: "PT 면접 같이 연습하실 분",
      type: "PT",
      capacity: 3,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">모의 면접 방 목록</h1>
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
                {/* 방 목록 생성 */}
                {rooms.map((room) => (
                  <>
                    {/* 각 면접방 간이 정보 블록 */}
                    <div className="bg-white shadow rounded p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm bg-green-100 text-green-800 text-xs font-medium me-2 py-1 px-2 rounded border border-green-400">
                          {/* 모집 중, 모집하고 있지 않음을 파악할 추가 조건이 필요한가? 그냥 인원 수가 꽉차거나 이미 진행 중인가? */}
                          모집중
                        </span>
                        <span className="text-sm bg-purple-100 text-purple-800 text-xs font-medium me-2 py-1 px-2 rounded border border-purple-400">
                          {room.type}
                        </span>
                      </div>
                      <p className="text-gray-700 font-semibold">
                        {room.title}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {room.description}
                      </p>

                      {/* 참여 버튼과 인원수 */}
                      <div className="mt-4 flex justify-between items-center">
                        <div>
                          <img
                            className="w-[24px] inline me-2"
                            src="/Interview/group.png"
                            alt=""
                          />
                          <span className="text-sm text-gray-600">
                            1 / {room.capacity}
                          </span>
                        </div>

                        {/* room.id 인 면접방으로 참여하게 되는 버튼 */}
                        <button className="bg-blue-600 text-white me-2 py-1 px-2 rounded w-[60px]">
                          참여
                        </button>
                      </div>
                    </div>
                  </>
                ))}
                <div className="bg-white shadow rounded p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm bg-green-100 text-green-800 text-xs font-medium me-2 py-1 px-2 rounded border border-green-400">
                      모집중
                    </span>
                    <span className="text-sm bg-purple-100 text-purple-800 text-xs font-medium me-2 py-1 px-2 rounded border border-purple-400">
                      PT
                    </span>
                  </div>
                  <p className="text-gray-700 font-semibold">
                    전공자 PT 준비방
                  </p>
                  <p className="text-gray-500 text-sm">
                    열심히 모의 면접 해서 붙어봅시다!
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <img
                        className="w-[24px] inline me-2"
                        src="/Interview/group.png"
                        alt=""
                      />
                      <span className="text-sm text-gray-600">1 / 3</span>
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
      <footer className="bg-gray-200 p-4">
        <div className="container mx-auto text-center">푸터 콘텐츠</div>
      </footer>
    </div>
  );
}
