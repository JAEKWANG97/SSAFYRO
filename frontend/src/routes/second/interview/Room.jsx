import { useParams, useNavigate } from "react-router-dom";

export default function Room() {
  const { roomid } = useParams();
  const navigate = useNavigate();

  function navigateHandler() {
    navigate('/second/interview');
  }

  function startInterviewHandler() {
    navigate(`/second/interview/room/${roomid}/pt_ready`); // 수정된 부분
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded p-4 max-w-4xl w-full">
        <div className="flex justify-between items-center mb-4">
          <button onClick={navigateHandler} className="bg-gray-200 rounded px-4 py-2">PT</button>
          <h1 className="text-xl font-bold">방 제목</h1>
          <button onClick={navigateHandler} className="bg-gray-200 rounded px-4 py-2">나가기</button>
        </div>
        <div className="flex mb-4">
          <div className="flex space-x-4">
            <div className="w-20 h-28 bg-gray-300 flex items-center justify-center">
              <span className="text-black">Icon 1</span>
            </div>
            <div className="w-20 h-28 bg-gray-300 flex items-center justify-center">
              <span className="text-black">Icon 2</span>
            </div>
            <div className="w-20 h-28 bg-gray-300 flex items-center justify-center">
              <span className="text-black">Icon 3</span>
            </div>
          </div>
          <div className="flex-grow ml-4 bg-gray-100 p-4">
            <h2 className="text-gray-500">면접 TIP</h2>
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <input
            type="text"
            placeholder="텍스트를 입력하세요."
            className="border border-gray-300 rounded p-2 mb-2"
          />
          <button className="bg-gray-200 rounded px-4 py-2 self-end">등록</button>
        </div>
        <button onClick={startInterviewHandler} className="bg-gray-200 rounded px-4 py-2 w-full">시작하기</button>
      </div>
    </div>
  );
}
