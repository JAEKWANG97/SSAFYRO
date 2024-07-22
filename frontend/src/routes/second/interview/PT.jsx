import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PT() {
  const navigate = useNavigate();

  const handleEndInterview = () => {
    navigate('/second/interview');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-5xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-2xl font-semibold">1</span>
            <span className="text-lg ml-1">Minutes</span>
            <span className="text-2xl font-semibold ml-4">59</span>
            <span className="text-lg ml-1">Seconds</span>
            <span className="text-2xl font-semibold ml-4">59</span>
            <span className="text-lg ml-1">Millisecond</span>
          </div>
          <button onClick={handleEndInterview} className="bg-red-500 text-white px-4 py-2 rounded">면접 종료</button>
        </div>
        <div className="flex justify-between mb-6">
          <div className="flex space-x-4">
            <div className="w-24 h-32 bg-gray-300 flex flex-col items-center justify-center rounded">
              <div className="w-16 h-16 bg-white rounded-full mb-2"></div>
              <span className="text-gray-600">이정준</span>
            </div>
            <div className="w-24 h-32 bg-gray-300 flex flex-col items-center justify-center rounded border-4 border-blue-500">
              <div className="w-16 h-16 bg-white rounded-full mb-2"></div>
              <span className="text-gray-600">이정준</span>
            </div>
            <div className="w-24 h-32 bg-gray-300 flex flex-col items-center justify-center rounded">
              <div className="w-16 h-16 bg-white rounded-full mb-2"></div>
              <span className="text-gray-600">이정준</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg mb-4">
          <p>안녕하세요! 이정준 님에 대한 면접 질문을 추천해 드릴게요!</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <button className="bg-gray-200 px-4 py-2 rounded flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h3v7h3v-7h3m10 0h-3v7h-3v-7h-3m10 0h-3v7h-3v-7h-3M13 7h7v7h-7z"></path>
            </svg>
            음소거
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16v16H4z"></path>
            </svg>
            평가
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">답변 제출하기</button>
        </div>
      </div>
    </div>
  );
}
