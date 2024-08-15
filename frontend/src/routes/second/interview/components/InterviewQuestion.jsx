import React, { useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

function InterviewQuestion({ questions, questionCount, setQuestionCount }) {
  useEffect(() => {
    // 이곳에서 초기 애니메이션 설정을 할 수 있습니다.
  }, [questionCount]);

  return (
    <div className="question-container">
      {questionCount < questions.length ? (
        <TypeAnimation
          sequence={[
            questions[questionCount], 
            1000, // 질문이 끝난 후 대기 시간
            () => {
              setQuestionCount((prev) => prev + 1); // 다음 질문으로 넘어가기
            }
          ]}
          wrapper="div" // <div>으로 변경
          cursor={true}
          repeat={0}
        />
      ) : (
        <TypeAnimation
          sequence={['본인 질문이 종료되었습니다', 1000]}
          wrapper="div" // <div>으로 변경
          cursor={true}
          repeat={0}
        />
      )}
    </div>
  );
}

export default InterviewQuestion;
