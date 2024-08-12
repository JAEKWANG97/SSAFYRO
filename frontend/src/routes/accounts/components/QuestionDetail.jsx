import { useState, useEffect } from "react";

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
    if (score >= 80) return "bg-green-100 text-green-800 border-green-300";
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        질문 상세 정보
      </h2>
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
        <div>
          <h3 className="text-lg font-semibold mb-2 text-purple-600">
            점수 정보
          </h3>
          <div
            className={`p-4 rounded-md border ${getScoreColor(
              item.totalScore
            )}`}
          >
            <p className="mb-2">
              <strong>총점:</strong> {item.totalScore}
            </p>
            <p>
              <strong>발음 점수:</strong> {item.pronounce_score}
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-orange-600">
            감정 표현
          </h3>
          <div className="bg-orange-50 p-4 rounded-md border border-orange-200">
            <p className="mb-2">
              <strong>행복:</strong> {(item.expressions.happy * 100).toFixed(1)}
              %
            </p>
            <p className="mb-2">
              <strong>슬픔:</strong> {(item.expressions.sad * 100).toFixed(1)}%
            </p>
            <p>
              <strong>중립:</strong>{" "}
              {(item.expressions.neutral * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
