import React, { useState } from 'react';
import { Card, Tooltip } from 'flowbite-react';
import ReactCardFlip from 'react-card-flip';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from './../../../components/Button'

export default function BestWorstQuestion() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [page, setPage] = useState(1);

  // 카드 데이터
  const cardData = [
    { id: 1, question: "질문 1", answer: "답변 1", feedback: "피드백 1", newQuestion: "새로운 질문 1", newAnswer: "새로운 답변 1", newFeedback: "새로운 피드백 1" },
    { id: 2, question: "질문 2", answer: "답변 2", feedback: "피드백 2", newQuestion: "새로운 질문 2", newAnswer: "새로운 답변 2", newFeedback: "새로운 피드백 2" },
    { id: 3, question: "질문 3", answer: "답변 3", feedback: "피드백 3", newQuestion: "새로운 질문 3", newAnswer: "새로운 답변 3", newFeedback: "새로운 피드백 3" },
    { id: 4, question: "질문 4", answer: "답변 4", feedback: "피드백 4", newQuestion: "새로운 질문 4", newAnswer: "새로운 답변 4", newFeedback: "새로운 피드백 4" },
    { id: 5, question: "질문 5", answer: "답변 5", feedback: "피드백 5", newQuestion: "새로운 질문 5", newAnswer: "새로운 답변 5", newFeedback: "새로운 피드백 5" }
  ];

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    setIsFlipped(false);
  };

  const currentCard = cardData[page - 1];

  return (
    <>
      <div className="container mx-auto p-5 max-w-2xl bg-white rounded-lg shadow-md mt-10 mb-20">
        <div className="relative py-5 mb-10">
          <h2 className="text-center font-bold text-2xl">WORST & BEST 질문 확인하기</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="black"
              className="w-8 h-8 mr-4 text-gray-400 absolute right-0 top-1/2 transform -translate-y-1/2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
        </div>

        <div className="flex justify-center">
          <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            {/* Front Side of the Card */}
            <Card className="mb-5 w-[600px] shadow-none border-2 pb-0" onClick={handleClick}>
              <Button
                text='WORST'
                type='WORST'/>
              <div className="w-full border-b-2 border-gray-400 pb-1 flex items-center gap-2">
                <span className="text-2xl font-medium">Q.</span>
                <span className="text-xl font-semibold">{currentCard.question}</span>
              </div>
              <div className="w-full border-b-2 border-gray-400 pb-1 flex gap-2">
                <span className="text-2xl font-medium">A.</span>
                <span className="text-md text-gray-700 pb-2">{currentCard.answer}</span>
              </div>
              <div className="w-full border-b-2 border-gray-400 flex gap-2">
                <div className="text-2xl font-medium mb-2">F.</div>
                <div className="text-md font-semibold text-blue-500 pb-2">{currentCard.feedback}</div>
              </div>
            </Card>

            {/* Back Side of the Card */}
            <Card className="mb-5 w-[600px] shadow-none border-2 pb-0" onClick={handleClick}>
              <Button
                text='BEST'
                type='BEST'/>
              <div className="w-full border-b-2 border-gray-400 pb-1 flex items-center gap-2">
                <span className="text-2xl font-medium">Q.</span>
                <span className="text-xl font-semibold">{currentCard.newQuestion}</span>
              </div>
              <div className="w-full border-b-2 border-gray-400 pb-1 flex gap-2">
                <span className="text-2xl font-medium">A.</span>
                <span className="text-md text-gray-700 pb-2">{currentCard.newAnswer}</span>
              </div>
              <div className="w-full pb-4 flex gap-2">
                <div className="text-2xl font-medium mb-2">F.</div>
                <div className="text-md font-semibold text-blue-500 pb-2">{currentCard.newFeedback}</div>
              </div>
            </Card>
          </ReactCardFlip>
        </div>

        <div className="flex justify-center mt-5">
          <Pagination
            count={cardData.length}
            page={page}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </div>

        <div className="pl-7 mt-5">
          <div 
            className="max-w-xl h-[80px] border-2 border-black rounded-xl flex flex-col font-extrabold pl-4 pt-4 relative transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => nav('bestworst_feedback', { state: { activeTab: "tab3" } })}
          >
            더 자세히 알아보기
            <span className="text-sm font-medium pt-1">유사 질답 내용을 모아놨어요.</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="black"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
