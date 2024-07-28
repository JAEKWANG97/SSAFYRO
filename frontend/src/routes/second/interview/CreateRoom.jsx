// CreateRoom.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateRoom() {
  const navigate = useNavigate();
  const [participantCount, setParticipantCount] = useState();
  const [interviewType, setInterviewType] = useState();

  function handleCancel() {
    navigate("/second/interview"); // 돌아가기 버튼 클릭 시 이동할 경로
  }

  function handleCreateRoom() {
    console.log(
      `방 생성: 참여 인원 수 - ${participantCount}, 면접 종류 - ${interviewType}`
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">방 생성하기</h1>

        <div className="flex justify-end space-x-4 mb-2">

          <div className="flex space-x-4 p-4">
            <select
              className="w-full max-w-xs border p-2 rounded "
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
            >
              <option value="" disabled>
                면접 종류 선택
              </option>
              <option value="인성 면접">인성 면접</option>
              <option value="PT 면접">PT 면접</option>
            </select>

            <select
              className="w-full max-w-xs border p-2 rounded "
              value={participantCount}
              onChange={(e) => setParticipantCount(e.target.value)}
            >
              <option value="" disabled>
                참여 인원 선택
              </option>
              <option value="1명">1명</option>
              <option value="2명">2명</option>
              <option value="3명">3명</option>
            </select>
          </div>
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
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 focus:outline-none">
            작성완료
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 focus:outline-none"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
