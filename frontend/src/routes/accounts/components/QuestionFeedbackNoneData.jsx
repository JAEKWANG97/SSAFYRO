import React from 'react';
import { FaRegSadTear } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const QuestionFeedbackNoneData = () => {
  const navigate = useNavigate();

  const handleStartInterview = () => {
    navigate('/second/interview');
  };

  const handleViewAllInterviews = () => {
    navigate('/accounts/interviews');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <FaRegSadTear className="text-6xl text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">아직 피드백이 없습니다</h2>
        <p className="text-gray-600 mb-6">
          면접 연습을 시작하고 첫 번째 피드백을 받아보세요!
        </p>
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleStartInterview}
        >
          면접 연습 시작하기
        </button>
        <button 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleViewAllInterviews}
        >
          전체 인터뷰 보기
        </button>
      </div>
    </div>
  );
};

export default QuestionFeedbackNoneData;