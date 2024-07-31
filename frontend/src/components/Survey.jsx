import React, { useState } from 'react';

export default function Survey() {
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
  };

  const handleSubmit = () => {
    console.log('Survey Answers:', answers);
    // 여기에 제출 로직을 추가하세요
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
                  value={idx + 1}
                  checked={answers[item.id] === String(idx + 1)}
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
