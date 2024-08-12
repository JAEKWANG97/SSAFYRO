import letterQ from "../../../../public/interview_result/letter-q.png";
import { useNavigate } from "react-router-dom";

export default function QuestionBox({ item, selectedItem }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/question_feedback/${item.id}`);
    window.scrollTo(0, 0);
  };

  const getScoreColor = (score) => {
    console.log(score);
    if (score >= 80) return "bg-[#8ACDD7]";
    if (score >= 60) return "bg-[#F9F9E0]";
    return "bg-[#FFC0D9]";
  };

  return (
    <div className="p-4">
      <div
        className={`bg-white rounded-lg shadow overflow-hidden cursor-pointer transform transition duration-200 hover:scale-105 hover:shadow-lg ${
          selectedItem === item ? "bg-blue-100" : "hover:bg-blue-100"
        }`}
        onClick={handleClick}
      >
        <div className={`h-2 ${getScoreColor(item.totalScore)}`}></div>
        <div className="p-4">
          <div className="flex gap-2 mb-2">
            <img src={letterQ} alt="letter-q" className="w-4 h-4" />
            <h3 className="font-bold">{item.question}</h3>
          </div>
          <div
            className={`text-sm font-medium ${getScoreColor(
              item.totalScore
            )} inline-block px-2 py-1 rounded-full`}
          >
            총점: {item.totalScore}
          </div>
        </div>
      </div>
    </div>
  );
}
