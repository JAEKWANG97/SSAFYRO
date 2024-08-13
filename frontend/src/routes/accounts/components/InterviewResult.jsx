import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getEmotionImageColor } from "../../../util/get-emotion-image-color";
import { Button, Modal } from "flowbite-react";
import Chart from "./Chart";
import useAuthStore from "../../../stores/AuthStore";
import axios from 'axios';

export default function InterviewResult() {
  const nav = useNavigate();
  const { chartType, setChartType } = useAuthStore()

  const [personTotalScore, setPersonTotalScore] = useState(null); // 인성 전체 점수
  const [personPronScore, setPersonPronScore] = useState(null);    // 인성 발음 점수 
  const [personExpression, setPersonExpression] = useState({});  // 인성 표정

  const [ptTotalScore, setPtTotalScore] = useState(null); // pt 전체 점수
  const [ptPronScore, setPtPronScore] = useState(null);    // pt 발음 점수 
  const [ptExpression, setPtExpression] = useState({});  // pt 표정

  const [openModal, setOpenModal] = useState(false);


  const APIURL = "https://i11c201.p.ssafy.io:8443/api/v1/reports/";
  const Token = localStorage.getItem("Token");
  const roomTypes = ['PERSONALITY', 'PRESENTATION'];
  

  useEffect(() => {
    const fetchData = () => {
      // 유저 개인의 레포트 평균 점수
      const requests = roomTypes.map((type) =>
        axios.get(`${APIURL}score-average`, {
          params: { roomType: type },
          headers: { Authorization: `Bearer ${Token}` },
        })
      );

      Promise.all(requests)
        .then((responses) => {
          responses.forEach((response, index) => {
            const roomType = roomTypes[index];
            const data = response.data.response;

            if (roomType === 'PERSONALITY' && data) {
              console.log('레포트 인성 평균 점수',data)
              setPersonTotalScore(data.totalScore);
              setPersonPronScore(data.pronunciationScore);
              setPersonExpression(data.expressions);
      
            } else if (roomType === 'PRESENTATION' && data) {
              console.log('레포트 pt 평균 점수', data)
              setPtTotalScore(data.totalScore);
              setPtPronScore(data.pronunciationScore);
              setPtExpression(data.expressions);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, [APIURL, Token]);

  

  const handleOpenModal = (content) => {
    setChartType(content); // 클릭한 면접 유형에 따라 chartType 설정
    setOpenModal(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const onHandlePT = () => {
    nav('/second/interview');
  };

  const onHandlePersonality = () => {
    nav('/second/interview');
  };

  return (
    <>
      <div className="flex justify-center gap-8">
        {personTotalScore !== null ? (
          <div
          onClick={() => handleOpenModal('PERSONALITY')}
            className="w-[300px] h-[200px] rounded-xl flex flex-col items-start justify-start p-4 transition-shadow hover:shadow-lg cursor-pointer"
            style={{ backgroundColor: "rgba(240, 240, 240, 0.8)" }}
          >
            <div className="flex items-center mb-2">
              <span className="text-gray-500 text-xs">인성 면접 점수</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3 text-gray-500 ml-2 mb-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
            <div className="flex justify-center items-center w-full">
              <div className="flex flex-col items-center">
                <span className="pb-2 text-gray-600 text-sm">전체</span>
                <span className="text-gray-600 font-extrabold text-4xl">{personTotalScore}</span>
              </div>
              <div className="w-0.5 h-8 bg-gray-400 mx-8"></div> 
              <div className="flex flex-col items-center">
                <span className="pb-2 text-gray-600 text-sm">발음</span>
                <span className="text-gray-600 font-extrabold text-4xl">{personPronScore}</span>
              </div>
            </div>
            <div className="flex justify-center items-center w-full">
              <div className="flex flex-col items-center">
                <span className="pb-2 text-gray-600 text-sm">표정</span>
                <div className="flex space-x-2">
                  {Object.entries(personExpression).map(([emotion, value]) => (
                    <div key={emotion} className='flex flex-col items-center'>
                      <img 
                        src={getEmotionImageColor(emotion)} 
                        alt={emotion} 
                        className="w-10 h-10 mr-1" 
                      />
                      <span className='pr-1 pt-1 text-xs mt-[-1px]'>{(value * 100).toFixed(0)}%</span>
                    </div>
                  ))}
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
        
        {ptTotalScore !== null ? (
          <div
            onClick={() => handleOpenModal('PRESENTATION')}
            className="w-[300px] h-[200px] rounded-xl flex flex-col items-start justify-start p-4 transition-shadow hover:shadow-lg cursor-pointer"
            style={{ backgroundColor: "rgba(240, 240, 240, 0.8)" }}
          >
            <div className="flex items-center mb-2">
              <span className="text-gray-500 text-xs">PT 면접 점수</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3 text-gray-500 ml-2 mb-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
            <div className="flex justify-center items-center w-full">
              <div className="flex flex-col items-center">
                <span className="pb-2 text-gray-600 text-sm">전체</span>
                <span className="text-gray-600 font-extrabold text-4xl">{ptTotalScore}</span>
              </div>
              <div className="w-0.5 h-8 bg-gray-400 mx-8"></div> 
              <div className="flex flex-col items-center">
                <span className="pb-2 text-gray-600 text-sm">발음</span>
                <span className="text-gray-600 font-extrabold text-4xl">{ptPronScore}</span>
              </div>
            </div>
            <div className="flex justify-center items-center w-full">
              <div className="flex flex-col items-center">
                <span className="pb-2 text-gray-600 text-sm">표정</span>
                <div className="flex space-x-2">
                  {Object.entries(ptExpression).map(([emotion, value]) => (
                    <div key={emotion} className='flex flex-col items-center'>
                      <img 
                        src={getEmotionImageColor(emotion)} 
                        alt={emotion} 
                        className="w-10 h-10 mr-1 mt-[-4px]"  
                      />
                      <span className='pr-1 pt-1 text-xs'>{(value * 100).toFixed(0)}%</span>
                    </div>
                  ))}
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

      {/* Modal Section */}
      <Modal 
        show={openModal} 
        onClose={handleCloseModal} 
        className="fixed inset-0 flex items-center justify-center"
        size="6xl" 
      >
        <Modal.Header>{chartType === 'PERSONALITY' ? '인성 면접 점수' : 'PT 면접 점수'}</Modal.Header>
        <Modal.Body>
          <Chart />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>닫기</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}