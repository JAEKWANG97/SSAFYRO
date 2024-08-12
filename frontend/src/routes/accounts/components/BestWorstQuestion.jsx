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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 ml-auto">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
            </svg>

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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 ml-auto">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
            </svg>

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
