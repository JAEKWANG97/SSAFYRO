// CreateRoom.jsx

import { useNavigate } from "react-router-dom";

export default function CreateRoom() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/second/interview'); // 돌아가기 버튼 클릭 시 이동할 경로
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">방 생성하기</h1>

        <div className="flex justify-end space-x-4 mb-8">
          <button className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none">참여 인원 수 ▽</button>
          <button className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none">면접종류 ▽</button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-8">
          <textarea
            placeholder="내용을 입력하세요"
            className="w-full border border-gray-300 rounded-lg p-4 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="flex justify-center space-x-4">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 focus:outline-none">작성완료</button>
          <button onClick={handleCancel} className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 focus:outline-none">취소</button>
        </div>
      </div>
    </div>
  );
}
