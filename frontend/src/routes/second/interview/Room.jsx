import { useParams, useNavigate } from "react-router-dom";
import { rooms } from "./data";

export default function Room() {
  const { roomid } = useParams();
  const navigate = useNavigate();
  const room = rooms.find((room) => room.roomId === roomid);

  const currentUser = { userId: 'LGG', name: 'Jun'}

  if (!room) return <div>방을 찾을 수 없습니다.</div>;

  function navigateHandler() {
    const participantIndex = room.participants.findIndex(
      (participant) => participant.userId === currentUser.userId
    )
    if (participantIndex !== -1) {
      room.participants.splice(participantIndex, 1)
    }
    navigate("/second/interview");
  }

  function startInterviewHandler() {
    navigate(`/second/interview/room/${roomid}/pt_ready`);
  }

  return (
    <div className="flex justify-center">
      <div
        className="w-9/10 mt-16 overflow-hidden"
        style={{ minWidth: "1100px" }}
      >
        <div className="w-full h-[80vh] border border-black mx-auto mt-5 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <div className="flex">
            <img
                className="h-[25px] inline pr-4"
                src="/SSAFYRO.png"
                alt="SSAFYRO 로고"
              />
              <p className="font-extrabold text-2xl">SSAFYRO</p>
            </div>
            <div className="items-center">
              <h1 className="font-extrabold text-2xl">{room.title}</h1>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              onClick={navigateHandler}
            >
              나가기
            </button>
          </div>

          <div className="h-[95%] border rounded-xl" 
          style={{ backgroundColor: "rgba(249, 250, 255, 1)", borderColor: "rgba(249, 250, 255, 1)" }}
          >
            <div className="flex h-[50%] p-4">
              <div
                className="w-[70%] rounded-lg p-1 flex items-center justify-between"
                // style={{ backgroundColor: "rgba(200, 200, 200, 0.2)" }}
                // style={{ backgroundColor: "rgba(174, 174, 174, 0.11)" }}
              >
                {room.participants.map((participant, index) => (
                  <div
                    key={index}
                    className="w-[32%] h-[90%] bg-gray-200 rounded-lg flex flex-col items-center justify-center px-5"
                  >
                    <img
                      src="/main/users.png"
                      alt="User"
                      className="h-2/3 object-contain rounded-full"
                    />
                    <span className="text-sm font-bold mt-2">{participant.userId}</span>
                  </div>
                ))}
                {Array(room.maxParticipants - room.participants.length).fill().map((_, index) => (
                  <div key={index} className="w-[33%] h-[90%] bg-gray-200 rounded-lg flex flex-col items-center justify-center px-5">
                    <span className="text-2xl text-gray-400">X</span>
                  </div>
                ))}
              </div>
              <div className="w-[30%] p-5 mt-2 bg-white shadow-md rounded-xl ml-3" >면접 팁 나오는 칸</div>
            </div>
            <div className="flex h-[42%] p-4">
              <div className="w-[70%] rounded-lg p-5 bg-white shadow-md mr-3">
              <h1 className="font-bold">Chat</h1>
              <hr />
                {/* 새로운 박스 내용 */}
                새로운 박스 내용
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
