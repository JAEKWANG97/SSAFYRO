import { useState } from "react"

export default function EvaluationModal ({ targetUser, setEvaluationModal, handleEvaluation }) {
  const [evaluationScore, setEvaluationScore] = useState("");
  
  return (<>
    <div>
      {[1, 2, 3, 4, 5].map((option) => (
        <label key={option}>
          {option}
          <input type="radio"
            value={option}
            onChange={(e) => setEvaluationScore(e.target.value)}
           />
        </label>
      ))}
    </div>
    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      onClick={() => {
        handleEvaluation(targetUser, evaluationScore);
        setEvaluationModal(false);
      }}
    >
      평가 점수 제출
    </button>
  </>)
};