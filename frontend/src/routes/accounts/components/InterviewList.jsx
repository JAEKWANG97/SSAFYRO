import { useState, useEffect } from 'react';
import { getInterviewInfo } from './../../../api/profileApi';
import { useNavigate } from 'react-router-dom';
import PersonaltyImg from './../../../../public/first/personality.png'
import PtImg from './../../../../public/first/pt.png'

export default function InterviewList() {
  const [interviewInfo, setInterviewInfo] = useState([]); // interviewInfo 상태를 추가
  const nav = useNavigate();

  useEffect(() => {
    getInterviewInfo()
    .then((res)=>{
      setInterviewInfo(res)
    }
    )
  }, []);


  return (
    <>
      <div className="pl-7">
        <div
          className="max-w-xl h-[80px] border rounded-xl flex flex-col font-extrabold pl-4 pt-4 relative transition-transform transform hover:scale-105"
          onClick={() =>
            nav("bestworst_feedback", { state: { activeTab: "tab3" } })
          }
        >
          이 질문들에서 점수를 높일 방법은?
          <span className="text-sm font-medium pt-1">
            WORST & BEST 질문을 확인해보세요
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
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

      <div className="mt-5 flex flex-wrap gap-4 pl-6">
        {interviewInfo.map((info, index) => (
          <div
            key={index}
            className="w-[132px] h-[100px] rounded-xl flex flex-col items-center justify-center text-gray-500 transition-shadow hover:shadow-lg"
            style={{ backgroundColor: "rgba(240, 240, 240, 0.8)" }}
            onClick={() =>
              info.type === "PERSONALITY"
                ? nav("personality_feedback", {
                    state: { info, activeTab: "tab3" },
                  })
                : nav("pt_feedback", {
                    state: { info, activeTab: "tab3" },
                  })
            }
          >
            <img
              src={info.type === "PERSONALITY" ? PersonaltyImg : PtImg}
              alt={
                info.type === "PERSONALITY"
                  ? "Personality Interview"
                  : "PT Interview"
              }
              className="w-10 h-10 mb-2"
            />
            <p className="font-medium text-sm text-center">{info.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}
