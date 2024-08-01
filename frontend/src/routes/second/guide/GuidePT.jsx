import React from "react";
import SecondNav from "../components/SecondNav.jsx";
import GuideNav from "./components/GuideNav.jsx";
import PtImg from './../../../../public/first/pt.png';

export default function GuidePT() {
  return (
    <>
      <SecondNav />
      <GuideNav />
      <div className="container mx-auto p-5 max-w-3xl bg-white rounded-lg shadow-lg mt-10 mb-20">
        <div className="text-center mb-8">
          <img src={PtImg} className="w-[400px] h-[300px] rounded-lg mx-auto" alt="PT 면접 가이드 이미지" />
        </div>
        <div className="px-8">
          <h1 className="text-3xl mt-8 mb-8 font-bold text-center text-gray-900">PT 면접 가이드</h1>
          <div className="text-lg px-6 mb-6 text-gray-800 leading-relaxed">
            <ul className="list-none mb-6 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✔️</span>
                <span>PT 모의 면접은 싸피로에서 준비한 주제와 질문을 기반으로 진행됩니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✔️</span>
                <span className="ml-2">모의면접 참여 인원이 <strong>1인</strong>일 경우, <strong>AI 면접</strong>이 진행됩니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✔️</span>
                <span className="ml-2"><strong>2인 이상</strong>일 경우, <strong>다대일 비대면 면접</strong>이 진행됩니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✔️</span>
                <span className="ml-2"><strong>2인 이상</strong>일 경우,  <strong>역할(면접자, 면접관)이 교대</strong>되면서 진행됩니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✔️</span>
                <div>
                  <span>PT 발표 이후, 발표한 내용을 기반으로 AI가 면접 질문을 생성하여</span>  
                  <span className="block">질의 혹은 추천해줍니다.</span>
                </div>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">미리보기</h2>
            <ol className="list-decimal list-inside mb-6 space-y-2">
              <li>디자인 완료된 후 사진 들어감</li>
              <li>PT 면접은 최근 IT 이슈를 파악하는 것이 중요합니다. 최근 IT 이슈 탭에서 싸피로가 선별한 다양한 IT 이슈를 공부해보세요!</li>
              <li>면접 연습하기 탭에서 직접 PT 면접 방을 생성하거나, 생성된 PT 면접 방에 들어가서 빠르게 면접을 시작할 수 있습니다.</li>
              <li>면접 대기실에서 PT 면접 진행 팁을 숙지한 후, 면접을 시작하세요!</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
