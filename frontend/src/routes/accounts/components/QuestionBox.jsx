import letterQ from "../../../../public/interview_result/letter-q.png";
import freeIconLetterQ from "../../../../public/interview_result/free-icon-letter-q-3541245.png";
import { CiCalendar } from "react-icons/ci";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

// 이모지 이미지 import
import angry from "../../../../public/profile/angry.png";
import fear from "../../../../public/profile/dead.png";
import happy from "../../../../public/profile/happy.png";
import neutral from "../../../../public/profile/neutral.png";
import sad from "../../../../public/profile/sad.png";
import suprised from "../../../../public/profile/suprised.png";
import vomiting from "../../../../public/profile/vomiting.png";

const emotionImages = {
  angry,
  fear,
  happy,
  neutral,
  sad,
  suprised,
  vomiting,
};

import { useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date
    .toLocaleString("ko-KR", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .replace(",", "")
    .replace(/^0/, "");
};

const renderEmotions = (expressions) => {
  return Object.entries(expressions).map(([emotion]) => {
    const emotionKey = emotion.toLowerCase();
    if (emotionImages[emotionKey]) {
      const size = 16;
      return (
        <img
          key={emotionKey}
          src={emotionImages[emotionKey]}
          alt={emotionKey}
          className="mr-1"
          style={{ width: `${size}px`, height: `${size}px`}}
        />
      );
    }
    return null;
  });
};

export default function QuestionBox({ item, selectedItem }) {

  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.setItem("detailItem", JSON.stringify(item));
    navigate(`/question_feedback/${item.interviewResultId}`);
    window.scrollTo(0, 0);
  };

  const getScoreColor = (score) => {
    if (score >= 4) return "bg-green-300";
    if (score >= 3) return "bg-yellow-300";
    return "bg-red-300";
  };

  const formattedDate = item.createdDate ? formatDate(item.createdDate) : "2024-08-14";

  const getScoreTextColor = (score) => {
    if (score >= 4) return "text-green-600";
    if (score >= 3) return "text-blue-600";
    if (score >= 2) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-4">
      <div
        className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-102 hover:shadow-lg ${
          selectedItem === item ? "ring-2 ring-blue-400" : "hover:bg-blue-50"
        }`}
        onClick={handleClick}
      >
        <div className={`h-1 ${getScoreColor(item.evaluationScore)}`}></div>
        <div className="flex items-center justify-between p-3">
          <div className="flex justify-center space-x-2">
            <span className="text-sm font-semibold text-gray-600">평점 </span>
            <span
              className={`text-sm font-bold ${getScoreTextColor(
                item.evaluationScore
              )}`}
            >
              {item.evaluationScore * 20}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            {renderEmotions(item.expressions)}
          </div>
        </div>
        <div className="p-4">
          <div className="flex space-x-3 mb-5">
            <div className="mt-1">
              <HiOutlineChatBubbleLeftRight className="w-4 h-4" />
            </div>
            <h3 className="font-light text-gray-800">{item.question}</h3>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <CiCalendar className="mr-2 text-blue-500" />
            <p>{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}