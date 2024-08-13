import { useState, useEffect } from "react";
import { EMOTIONS, SCORE_RANGES } from "./constants";

import angry from "../../../../public/profile/angry.png";
import dead from "../../../../public/profile/dead.png";
import happy from "../../../../public/profile/happy.png";
import neutral from "../../../../public/profile/neutral.png";
import sad from "../../../../public/profile/sad.png";
import suprised from "../../../../public/profile/suprised.png";
import vomiting from "../../../../public/profile/vomiting.png";

const emotionImages = {
  angry,
  dead,
  happy,
  neutral,
  sad,
  suprised,
  vomiting,
};

export default function QuestionDetail({ detailItem }) {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setItem(detailItem);
    setIsLoading(false);
  }, [detailItem]);

  if (isLoading || !item) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const getScoreColor = (score) => {
    return SCORE_RANGES.find((range) => score >= range.min).color;
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <div className="flex justify-between items-start mb-6 pb-2 border-b">
        <h2 className="text-2xl font-bold text-gray-800">질문 상세 정보</h2>
        <div className="flex items-end gap-2">
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(
              item.totalScore
            )}`}
          >
            총점: {item.totalScore}
          </div>
          <div className="flex flex-wrap justify-end gap-2 mt-2">
            {Object.entries(item.expressions).map(([key, value]) => {
              if (value !== undefined && emotionImages[key]) {
                return (
                  <div key={key} className="flex items-center space-x-1">
                    <img
                      src={emotionImages[key]}
                      alt={key}
                      className="w-6 h-6"
                    />
                    {/* <span className="text-xs">{(value * 100).toFixed(1)}%</span> */}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-600">질문</h3>
          <p className="text-gray-700 bg-blue-50 p-4 rounded-md border border-blue-200 tracking-wide leading-loose">
            {item.question}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-green-600">답변</h3>
          <p className="text-gray-700 bg-green-50 p-4 rounded-md border border-green-200 tracking-wide leading-loose">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
