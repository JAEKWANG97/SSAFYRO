import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { currentUser } from './data'; // currentUser 가져오기
import axios from 'axios';

export default function CreateRoom() {
  const navigate = useNavigate();
  const [participantCount, setParticipantCount] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCancel = () => {
    navigate("/second/interview");
  }

  const handleCreateRoom = () => {
    // 필수 입력 필드가 모두 채워졌는지 확인
    if (!participantCount || !interviewType || !title || !description) {
      alert("필수 내용을 입력해 주세요");
      return;
    }

    // roomData 객체 생성
    const roomData = {
      userId: currentUser.userId, 
      title,                                 // 방 이름
      description,                           // 방 설명
      type: interviewType,                   // 면접종류
      capacity: parseInt(participantCount),  // 참여인원수
    };
    console.log(roomData)

    // 서버에 POST 요청 보내기
    axios.post('http://localhost:8080/api/v1/rooms', roomData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      const newRoomId = response.data.roomId; // 서버에서 반환된 roomId

      // 조건에 따라 적절한 경로로 리디렉션
      if (interviewType === 'personality') {
        navigate(`/second/interview/room/${newRoomId}/personality`);
      } else if (interviewType === 'pt') {
        navigate(`/second/interview/room/${newRoomId}/pt`);
      }
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">방 생성하기</h1>

        <div className="flex justify-end space-x-4 mb-2">
          <div className="flex space-x-4 p-4">
            <select
              className="w-full max-w-xs border p-2 rounded"
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
            >
              <option value="" disabled>
                면접 종류 선택
              </option>
              <option value="personality">인성 면접</option>
              <option value="pt">PT 면접</option>
            </select>

            <select
              className="w-full max-w-xs border p-2 rounded"
              value={participantCount}
              onChange={(e) => setParticipantCount(e.target.value)}
            >
              <option value="" disabled>
                참여 인원 선택
              </option>
              <option value="1">1명</option>
              <option value="2">2명</option>
              <option value="3">3명</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={30}
          />
        </div>
        <div className="mb-8">
          <textarea
            placeholder="내용을 입력하세요"
            className="w-full border border-gray-300 rounded-lg p-4 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={50}
            style={{ resize: 'none'}}
          ></textarea>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleCreateRoom}
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 focus:outline-none"
          >
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
