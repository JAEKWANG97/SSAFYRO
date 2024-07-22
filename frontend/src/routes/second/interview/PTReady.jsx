import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function PTReady() {
  const navigate = useNavigate();
  const { roomid } = useParams();

  const handleEndInterview = () => {
    navigate('/second/interview');
  };

  const handleStartInterview = () => {
    navigate(`/second/interview/room/${roomid}/pt`); // 수정된 부분
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">참고</button>
          <div className="text-center">
            <h2 className="text-lg font-semibold">남은 시간</h2>
            <div className="text-4xl font-bold">09:38</div>
          </div>
          <button onClick={handleEndInterview} className="bg-red-500 text-white px-4 py-2 rounded">면접 종료</button>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-4">PT 면접 주제</h3>
          <p className="mb-4">다음 기사를 읽고 현재 불편 사항을 개선할 서비스를 제안하시오</p>
          <p className="mb-2">트럼프가 총에 맞았지만 엄청난 운으로 살아남았다. 투명 트럼프가 울부짖었다. 크아아아앙. 투명 트럼프는 존나 강해서 미국 대통령 선거를 씹어먹었다.</p>
          <p>투명 트럼프가 가져오는 미국 중심 외교 정책은 우크라이나 전쟁을 비롯한 국제 정세 양상에 어떤 영향을 끼치는가? 이것은 2022년 들어서 급성장하기 시작한 인공지능(AI) 발전과도 관계를 맺을 수 있어보인다. AI로 매우 효율적인 작업이 가능해지면서 군사 분야에서도 고도의 발전을 기대하게 한다.</p>
        </div>
        <div className="flex justify-between">
          <button onClick={handleStartInterview} className="bg-green-500 text-white px-4 py-2 rounded">면접 시작</button>
        </div>
      </div>
    </div>
  );
}
