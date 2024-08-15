import axios from 'axios';
import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

export default function Survey({ targetUser, setModalClose, setTotalResult }) {
  const roomId = useParams().roomid;
  console.log("Current Room ID:", roomId); // Room ID 확인용
  console.log("Target User ID:", targetUser); // Target User ID 확인용
  // const location = useLocation();
  // const { targetUser } = location.state;
  
  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
  });

  const handleChange = (event) => {
    setAnswers({
      ...answers,
      [event.target.name]: event.target.value,
    });
    console.log("Updated Answers:", { // 각 질문의 점수 업데이트 확인용
      ...answers,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Final Answers on Submit:", answers); // 제출 시점에서 최종 답변 확인용
    // 여기에 제출 로직을 추가하세요
    let totalScore = Number(answers.q1) + Number(answers.q2) + Number(answers.q3) + Number(answers.q4) + Number(answers.q5);
    console.log("Total Score:", totalScore); // 총점 확인용

    const requestBody = {
      roomId: roomId,
      articleId: null, // articleId가 어디서 오는지 모르겠음. docs 기준으로 articleId 획득처가 없는 것으로 추정됨.
      userId: targetUser,
      totalScore: totalScore,
    }

    console.log("Request Body for Submission:", requestBody); // 서버로 제출할 데이터 확인용


    setTotalResult(requestBody);
    setModalClose();

    // axios.post("https://i11c201.p.ssafy.io:8443/api/v1/reports", requestBody)
    // .then((response) => {
    //   alert('평가 제출이 완료되었습니다.'); // 모달화가 완료되면 이거 지우고 모달 닫는 함수로 변경
    //   setModalClose();
    // })
    // .catch((error) => {
    //   console.log(error);
    //   setModalClose();
    // });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">면접 평가표</h1>
      {[
        { id: 'q1', question: '질문의 답변이 적절한가?' },
        { id: 'q2', question: '답변의 일관성이 있는가?' },
        { id: 'q3', question: '예상치 못한 질문에 잘 적응하고 대처하였는가?' },
        { id: 'q4', question: '적절한 비언어적 표현(손짓, 몸짓, 시선처리 등)을 취했는가?' },
        { id: 'q5', question: 'SW에 대한 학습 의지와 열정이 돋보이는가?' },
      ].map((item, index) => (
        <div key={item.id} className="mb-6">
          <h2 className="text-xl mb-2">{index + 1}. {item.question}</h2>
          <div className="flex space-x-4">
            {['매우 미흡', '미흡', '보통', '우수', '매우 우수'].map((label, idx) => (
              <label key={idx} className="flex flex-col items-center">
                <input
                  type="radio"
                  name={item.id}
                  value={(idx + 1) * 4}
                  // checked={answers[item.id] === String(idx + 1)}
                  onChange={handleChange}
                  className="mb-1"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        제출
      </button>
    </div>
  );
}
