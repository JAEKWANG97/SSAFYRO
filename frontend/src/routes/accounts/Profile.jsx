import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import EssayDetail from './components/EssayDetail';
import InterviewResult from './components/InterviewResult';
import UserImg from './../../../public/main/user.jpg';
import useAuthStore from '../../stores/AuthStore';
import Button from './../../../src/components/Button';
import { Card } from 'flowbite-react';

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

  const onHandlePT = () => {
    if (isPt) {
      nav('pt_feedback');
    }
  };

  const onHandlePersonality = () => {
    if (isPerson) {
      nav('personality_feedback');
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
      <div className="container mx-auto p-5 max-w-4xl bg-white rounded-lg shadow-md mt-10 mb-20">
        <div className='flex justify-center pt-10 pb-5'>
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

          
          <div className="flex justify-center gap-8">
            <div 
              className="w-[300px] h-[180px] rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(211, 211, 211, 0.2)" }}>
              <div className="flex flex-col items-center justify-center space-y-2">
                <span>Total 93 점</span>
                <span>표정</span>
                <span>발음</span>
              </div>
            </div>
            <div 
              className="w-[300px] h-[180px] rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(211, 211, 211, 0.2)" }}>
              <div className="flex flex-col items-center justify-center space-y-2">
                <span>PT 면접 점수</span>
                <span>상위 표정 3개</span>
                <span>발음점수 히스토그램</span>
              </div>
            </div>
            </div>

   
          
        
        <div className="mt-10 mb-3">
          <TETabs fill>
            <TETabsItem
              onClick={() => handleFillClick("tab1")}
              active={fillActive === "tab1"}
              className={`pb-4 !text-xl ${fillActive === "tab1" ? 'text-black' : 'text-gray-400'}`}
            >
              에세이
            </TETabsItem>
            <TETabsItem
              onClick={() => handleFillClick("tab2")}
              active={fillActive === "tab2"}
              className={`pb-4 !text-xl ${fillActive === "tab2" ? 'text-black' : 'text-gray-400'}`}
            >
              적성진단
            </TETabsItem>
            <TETabsItem
              onClick={() => handleFillClick("tab3")}
              active={fillActive === "tab3"}
              className={`pb-4 !text-xl ${fillActive === "tab3" ? 'text-black' : 'text-gray-400'}`}
            >
              면접
            </TETabsItem>
          </TETabs>
      
          <TETabsContent>
            <TETabsPane show={fillActive === "tab1"}>
            <EssayDetail/>
            </TETabsPane>
            <TETabsPane show={fillActive === "tab2"}>
              {/* Dashboard content */}
            </TETabsPane>
            <TETabsPane show={fillActive === "tab3"}>
              {/* Settings content */}
            </TETabsPane>
          </TETabsContent>
        </div>
        {/* <div className={`flex ${isPerson && isPt ? 'justify-center gap-4' : 'justify-center'}`}>
          {isPerson && (
            <Button 
              type='PERSONALITY'
              text='인성 면접 결과 자세히 보기'
              onClick={onHandlePersonality}
            />
          )}
          
          {isPt && (
            <Button 
              type='PT'
              text='PT 면접 결과 자세히 보기'
              onClick={onHandlePT}
            />
          )}
        </div> */}
        <div className="flex pb-10 items-center relative pt-4 ">
        </div>
      </div>
    </div>
  );
}
