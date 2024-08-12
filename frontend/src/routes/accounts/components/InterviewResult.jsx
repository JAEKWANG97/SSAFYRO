import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import useAuthStore from "../../../stores/AuthStore";
import happyImg from './../../../../public/profile/happy.png';
import neutralImg from './../../../../public/profile/neutral.png';
import sadImg from './../../../../public/profile/sad.png';

export default function InterviewResult() {

  const nav = useNavigate();
  const isPerson = useAuthStore((state) => state.isPerson);
  const isPt = useAuthStore((state) => state.isPt);
  const [totalScore, settotalScore] = useState(93); // 전체 점수
  const [pronScore, setpronScore] = useState(80)    // 발음 점수 

  const onHandlePT = () => {
    if (isPt) {
      nav('pt_feedback');
    } else {
      nav('/second/interview');
    }
  };

  const onHandlePersonality = () => {
    if (isPerson) {
      nav('personality_feedback');
    } else {
      nav('/second/interview');
    }
  };

  return (
    <>
      <div className="flex justify-center gap-8">
        {isPerson ? (
          <div
          className="w-[300px] h-[200px] rounded-xl flex flex-col items-start justify-start p-4 transition-shadow hover:shadow-lg"
          style={{ backgroundColor: "rgba(240, 240, 240, 0.8)" }}
        >
          <div className="flex items-center mb-2">
            <span className="text-gray-500 text-xs">인성 면접 점수</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3 text-gray-500 ml-2 mb-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </div>


          
          <div className="flex justify-center items-center w-full pb-2">
            <div className="flex flex-col items-center">
              <span className="pb-2 text-gray-600 text-sm">전체</span>
              <span className="text-gray-600 font-extrabold text-4xl">{totalScore}</span>
            </div>
            <div className="w-0.5 h-8 bg-gray-400 mx-8"></div> 
            <div className="flex flex-col items-center">
              <span className="pb-2 text-gray-600 text-sm">발음</span>
              <span className="text-gray-600 font-extrabold text-4xl">{pronScore}</span>
            </div>
          </div>

          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col items-center">
              <span className="pb-2 text-gray-600 text-sm">표정</span>
              <div className="flex space-x-2">
                <img
                  src={happyImg}
                  alt="happy"
                  style={{ width: '30px', height: '30px' }}
                />
                <img
                  src={neutralImg}
                  alt="neutral"
                  style={{ width: '30px', height: '30px' }}
                />
                <img
                  src={sadImg}
                  alt="sad"
                  style={{ width: '30px', height: '30px' }}
                />
              </div>
            </div>
          </div>

        </div>
        ) : (
              <div
                className="w-[300px] h-[200px] rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer transition-shadow hover:shadow-lg"
                style={{ backgroundColor: "rgba(240, 240, 240, 0.8)" }}
                onClick={onHandlePersonality}
              >
                <span className="text-xl text-gray-500 font-semibold text-center pb-1">인성 모의 면접</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl text-gray-500 font-semibold text-center">참여하러 가기</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                  </svg>
                </div>
              </div>

        )}
        
        {isPt ? (
          <div
            className="w-[300px] h-[200px] rounded-xl flex flex-col items-start justify-start p-4 transition-shadow hover:shadow-lg"
            style={{ backgroundColor: "rgba(240, 240, 240, 0.8)" }}
          >
          <div className="flex items-center mb-2">
            <span className="text-gray-500 text-xs">PT 면접 점수</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3 text-gray-500 ml-2 mb-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </div>
            
            <div className="flex justify-center items-center w-full pb-2">
              <div className="flex flex-col items-center">
                <span className="pb-2 text-gray-600 text-sm">전체</span>
                <span className="text-gray-600 font-extrabold text-4xl">{totalScore}</span>
              </div>
              <div className="w-0.5 h-8 bg-gray-400 mx-8"></div> 
              <div className="flex flex-col items-center">
                <span className="pb-2 text-gray-600 text-sm">발음</span>
                <span className="text-gray-600 font-extrabold text-4xl">{pronScore}</span>
              </div>
            </div>

            <div className="flex justify-center items-center w-full">
              <div className="flex flex-col items-center">
                <span className="pb-2 text-gray-600 text-sm">표정</span>
                <div className="flex space-x-2">
                  <img
                    src={happyImg}
                    alt="happy"
                    style={{ width: '30px', height: '30px' }}
                  />
                  <img
                    src={neutralImg}
                    alt="neutral"
                    style={{ width: '30px', height: '30px' }}
                  />
                  <img
                    src={sadImg}
                    alt="sad"
                    style={{ width: '30px', height: '30px' }}
                  />
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div
            className="w-[300px] h-[200px] rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer transition-shadow hover:shadow-lg"
            style={{ backgroundColor:"rgba(240, 240, 240, 0.8)"  }}
            onClick={onHandlePT}
          >
                <span className="text-xl text-gray-500 font-semibold text-center pb-1">PT 모의 면접</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl text-gray-500 font-semibold text-center">참여하러 가기</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                  </svg>
                </div>
          </div>
        )}
      </div>
      <div className="pl-4 flex justify-end pt-4">
        <span className="text-xs text-gray-500">※ 면접 결과의 평균을 기반으로 작성되었습니다</span>
      </div>
    </>
  );
}
