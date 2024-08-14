import { useState, useEffect } from "react";
import { SCORE_RANGES } from "./constants";
import HAPPY  from '../../../../public/profile/happy.png'
import SAD  from '../../../../public/profile/sad.png'
import ANGRY  from '../../../../public/profile/angry.png'
import NEUTRAL  from '../../../../public/profile/neutral.png'
import FEAR  from '../../../../public/profile/dead.png'
import SURPRISED  from '../../../../public/profile/suprised.png'
import VOMITING  from '../../../../public/profile/vomiting.png'



const getEmotionImage = (emotion) => {
  switch (emotion) {
    case "HAPPY":
      return HAPPY;
    case "SAD":
      return SAD;
    case "ANGRY":
      return ANGRY;
    case "NEUTRAL":
      return NEUTRAL;
    case "FEAR":
      return FEAR;
    case "SURPRISED":
      return SURPRISED;
    case "VOMITING":
      return VOMITING;  
  }
};

export default function QuestionDetail() {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setItem(JSON.parse(localStorage.getItem("detailItem")));
    setIsLoading(false);
    console.log("질문 상세 정보 로드");
    console.log(localStorage.getItem("detailItem"));
  }, []);

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
              item.evaluationScore * 20
            )}`}
          >
            총점: {item.evaluationScore * 20}
          </div>
          <div className="flex flex-wrap justify-end gap-2 mt-2">
            {Object.entries(item.expressions).map(([key, value]) => {
              const emotionImage = getEmotionImage(key);
              console.log(emotionImage);
              if (value !== undefined && emotionImage) {
                return (
                  <div key={key} className="flex items-center space-x-1">
                    <img src={emotionImage} alt={key} className="w-6 h-6" />
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
