import React, { useState, useEffect } from "react";

export default function InterviewQuestion({ userInfo, questions, questionCount }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const currentQuestion = questionCount === 0 
      ? `안녕하세요! ${userInfo.userName} 님에 대한 면접 질문을 추천해 드릴게요!\n${questions[questionCount]}`
      : questions[questionCount] || ""; // questions[questionCount]가 undefined인 경우 빈 문자열로 대체

    const intervalId = setInterval(() => {
      if (index < currentQuestion.length) {
        setDisplayedText((prev) => prev + currentQuestion[index]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 50); // 문자 단위 타이핑 속도 조정 (ms 단위)

    return () => {
      clearInterval(intervalId);
      setDisplayedText("");
    };
  }, [questionCount, questions, userInfo.userName]);

  return (
    <p className="ml-4 whitespace-pre-line">{displayedText}</p>
  );
}
