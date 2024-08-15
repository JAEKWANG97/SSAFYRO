import React, { useState, useEffect } from "react";
import { Card, Tooltip } from "flowbite-react";
import ReactCardFlip from "react-card-flip";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import ErrorPage from "./ErrorPage";
import QuestionFeedbackNoneData from "./QuestionFeedbackNoneData";
import Loading from "../../components/Loading";
import {
  getBestWorstQuestion,
  getBestWorstQuestionByUser,
} from "./../../../api/bestWorstQuestionApi";

import {
  ArrowRightIcon,
  InfoIcon,
  SparklesIcon,
} from "./../../../heroicons/Icons";

export default function BestWorstQuestion() {
  const [cardData, setCardData] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    setIsFlipped(false);
  };

  const currentCard = cardData[page - 1] || {};

  useEffect(() => {
    const page = 0;
    const size = 5;
    const sort = "evaluationScore";

    const fetchData = async () => {
      try {
        const bestData = await getBestWorstQuestion(page, size);
        const worstData = await getBestWorstQuestionByUser(page, size, sort);

        const newCardData = bestData.response.interviewResultInfos.map(
          (best, index) => ({
            id: index + 1,
            question:
              worstData.response.interviewResultInfos[index]?.question || "",
            answer:
              worstData.response.interviewResultInfos[index]?.answer || "",
            newQuestion: best.question || "",
            newAnswer: best.answer || "",
          })
        );

        setCardData(newCardData);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  if (cardData.length === 0) {
    return <QuestionFeedbackNoneData />;
  }

  return (
    <>
      <div
        className="container mx-auto p-5 max-w-2xl bg-white rounded-lg shadow-md mt-10 mb-20"
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 -4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="relative py-8 mb-12 bg-blue-50 rounded-lg shadow-sm">
          {" "}
          <div className="flex items-center justify-center space-x-3 pb-2">
            <SparklesIcon className="w-6 h-6 text-blue-600" />
            <h3 className="text-center text-3xl font-bold text-gray-800">
              탁월한 답변 사례
            </h3>
            <SparklesIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="text-center text-lg text-blue-600 font-medium">
            유사 질문에 대한 최고의 답변 Top 5
          </h4>
          <p className="text-center text-sm text-gray-600 mt-2 max-w-md mx-auto">
            다른 사용자들의 뛰어난 답변을 참고하여
            <br />
            당신의 면접 실력을 한 단계 높여보세요!
          </p>
        </div>
        <div className="flex justify-center">
          <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <QuestionCard
              data={currentCard}
              onClick={handleClick}
              isFlipped={false}
            />
            <QuestionCard
              data={{
                question: currentCard.newQuestion || "",
                answer: currentCard.newAnswer || "",
              }}
              onClick={handleClick}
              isFlipped={true}
            />
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
        <div className="mt-8">
          <div
            className="max-w-xl h-[80px] border-2 border-black rounded-xl flex flex-col font-extrabold pl-4 relative transition-transform transform hover:scale-105 mx-auto justify-center"
            onClick={() =>
              navigate("/account/profile/question_feedback", {
                state: { activeTab: "tab3" },
              })
            }
          >
            <div>
              <h3 className="text-xl font-bold mb-1">더 자세히 알아보기</h3>
              <p className="text-sm font-medium text-gray-400">
                유사 질답 내용을 모아놨어요.
              </p>
            </div>
            <ArrowRightIcon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </>
  );
}
