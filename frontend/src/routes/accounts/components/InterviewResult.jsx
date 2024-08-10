import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../stores/AuthStore';
import happyImg from './../../../../public/emotion/happy_9294644.png'


export default function InterviewResult() {

  const nav = useNavigate();
  const isPerson = useAuthStore((state) => state.isPerson);
  const isPt = useAuthStore((state) => state.isPt);
  const [totalScore, settotalScore] = useState(93);


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
            className="w-[300px] h-[180px] rounded-xl flex flex-col items-start justify-start p-4"
            style={{ backgroundColor: "rgba(240, 240, 240, 0.8)" }}
          >
            <span className="mb-2 text-gray-500 text-sm">인성면접</span>
            <div className="flex flex-col items-center justify-center space-y-2 w-full">
              <div className="flex items-center">
                <span className="mr-2">점수</span>
                <span> {totalScore}점</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">표정</span>
                <div className="flex space-x-1">
                  <img
                    src={happyImg}
                    alt="happy"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <img
                    src={happyImg}
                    alt="happy"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <img
                    src={happyImg}
                    alt="happy"
                    style={{ width: '20px', height: '20px' }}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-2">발음</span>
                <div>히스토그램</div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="w-[300px] h-[180px] rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer"
            style={{ backgroundColor: "rgba(240, 240, 240, 0.8)"  }}
            onClick={onHandlePersonality}
          >
            <span className="text-xl text-gray-500 font-semibold text-center pb-1">인성 모의 면접</span>
            <span className="text-xl text-gray-500 font-semibold text-center">참여하러 가기 </span>
          </div>
        )}
        

        {isPt ? (
          <div
            className="w-[300px] h-[180px] rounded-xl flex flex-col items-start justify-start p-4"
            style={{ backgroundColor: "rgba(240, 240, 240, 0.8)"  }}
          >
            <span className="mb-2 text-gray-500 text-sm">PT면접</span>
            <div className="flex flex-col items-center justify-center space-y-2 w-full">
              <span>Total 93 점</span>
              <span>표정</span>
              <span>발음</span>
            </div>
          </div>
        ) : (
          <div
            className="w-[300px] h-[180px] rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer"
            style={{ backgroundColor:"rgba(240, 240, 240, 0.8)"  }}
            onClick={onHandlePT}
          >
            <span className="text-xl text-gray-500 font-semibold text-center pb-1">PT 모의 면접</span>
            <span className="text-xl text-gray-500 font-semibold text-center">참여하러 가기 </span>
          </div>
        )}
      </div>
      <div className="pl-4 flex justify-end pt-4">
        <span className="text-xs text-gray-500">※ 면접 결과의 평균을 기반으로 작성되었습니다</span>
      </div>
    </>
  );
}
