import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import useFirstStore from "../../stores/FirstStore";
import EssayDetail from './components/EssayDetail';
import InterviewResult from './components/InterviewResult';
import UserImg from './../../../public/main/user.jpg';
import useAuthStore from '../../stores/AuthStore';
import Button from './../../../src/components/Button';
import { Card } from 'flowbite-react';
import happyImg from './../../../public/emotion/happy_9294644.png';
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";

export default function Profile() {
  const nav = useNavigate();
  const isPerson = useAuthStore((state) => state.isPerson);
  const isPt = useAuthStore((state) => state.isPt);
  const userInfo = useAuthStore((state) => state.userInfo);
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
  
  const [fillActive, setFillActive] = useState("tab1");
  
  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }
    setFillActive(value);
  };

  return (
    <div>
      <div className="container mx-auto p-5 max-w-2xl bg-white rounded-lg shadow-md mt-10 mb-20">
        <div className='flex justify-center py-3'>
            <div className="flex items-center mb-6 gap-9">
              <img 
                src={UserImg} 
                alt="UserImg" 
                style={{
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '50%', 
                  objectFit: 'cover', 
                }}
              />
              <div>
                <div className="flex items-center gap-3 pb-3">
                  <h2 className="text-2xl font-semibold text-center">{`${userInfo.userName}`}</h2>
                  <Button
                    text = '전공자' // 전공자 or 비전공자 알맞게 버튼 렌더링
                    type ='MAJOR'/>
                </div>
                {/* 면접 횟수 각각 카운트해서 렌더링 */}
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">인성 모의 면접 N번 </span> 
                  <span className="text-sm text-gray-500">PT 모의 면접 N번</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="borer-t-10 pb-5"/>
          <div className="pl-4 pb-5">
            {/* <span className="text-base text-gray-500">모의 면접 결과 한 눈에 보기</span> */}
          </div>
          <div className="flex justify-center gap-8">
          {isPerson ? (<div 
            className="w-[300px] h-[180px] rounded-xl flex flex-col items-start justify-start p-4"
            style={{ backgroundColor: "rgba(173, 216, 230, 0.2)" }}>
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
          ):(<div 
            className="w-[300px] h-[180px] rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer"
            style={{ backgroundColor: "rgba(173, 216, 230, 0.2)" }}
            onClick={onHandlePersonality}>
            <span className="text-xl text-gray-500 font-semibold text-center pb-1">인성 모의 면접</span>
            <span className="text-xl text-gray-500 font-semibold text-center">참여하러 가기 </span>
          </div>)}
          
          {isPt ? (
            <div 
              className="w-[300px] h-[180px] rounded-xl flex flex-col items-start justify-start p-4"
              style={{ backgroundColor: "rgba(173, 216, 230, 0.2)" }}>
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
              style={{ backgroundColor: "rgba(173, 216, 230, 0.2)" }}
              onClick={onHandlePT}>
              <span className="text-xl text-gray-500 font-semibold text-center pb-1">PT 모의 면접</span>
              <span className="text-xl text-gray-500 font-semibold text-center">참여하러 가기 </span>
            </div>
          )}
        </div>
        <hr className="borer-t-10 mt-5"/>

        <div className="mt-10 mb-3">
          <TETabs fill>
            <TETabsItem
              onClick={() => handleFillClick("tab1")}
              active={fillActive === "tab1"}
              className={`pb-4 !text-base !font-extrabold ${fillActive === "tab1" ? 'border-b-2 border-blue-400 text-blue-400' : 'text-gray-400'}`}
            >
              에세이
            </TETabsItem>
            <TETabsItem
              onClick={() => handleFillClick("tab2")}
              active={fillActive === "tab2"}
              className={`pb-4 !text-base !font-extrabold ${fillActive === "tab2" ? 'border-b-2 border-blue-400 text-blue-400' : 'text-gray-400'}`}
            >
              적성진단
            </TETabsItem>
            <TETabsItem
              onClick={() => handleFillClick("tab3")}
              active={fillActive === "tab3"}
              className={`pb-4 !text-base !font-extrabold ${fillActive === "tab3" ? 'border-b-2 border-blue-400 text-blue-400' : 'text-gray-400'}`}
            >
              면접
            </TETabsItem>
          </TETabs>

          <TETabsContent>
            <TETabsPane show={fillActive === "tab1"}>
              <EssayDetail />
            </TETabsPane>
            <TETabsPane show={fillActive === "tab2"}>
              {/* Dashboard content */}
            </TETabsPane>
            <TETabsPane show={fillActive === "tab3"}>
              {/* Settings content */}
            </TETabsPane>
          </TETabsContent>
        </div>
        <div className="flex pb-10 items-center relative pt-4 ">
        </div>
      </div>
    </div>
  );
}
