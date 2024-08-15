import { useEffect, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useLocation } from 'react-router-dom';
import { Card } from 'flowbite-react';
import { Modal } from "flowbite-react";
import axios from 'axios';
import { getEmotionImageColor } from '../../../util/get-emotion-image-color';

export default function PtFeedback() {
  const APIURL = "https://i11c201.p.ssafy.io:8443/api/v1/";
  const location = useLocation();
  const info = location.state?.info;
  const [count, setCount] = useState(0);
  const [reportDetail, setReportDetail] = useState([]);
  const [article, setArticle] = useState({});

  const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
      setIsOpen(true);
    };

    const closeModal = () => {
      setIsOpen(false);
    };

 

  const formattedDate = new Date(info.createdDate).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\./g, '-').replace(/ /g, '').replace(/-$/, '');

  useEffect(() => {
    axios
      .get(`${APIURL}report/${info.reportId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((res) => {
        setCount(res.data.response.qnaCount);
        setReportDetail(res.data.response.reportDetails);
        setArticle(res.data.response.article);
      })
      .catch((error) => {
        console.log(error);
      });
    window.scrollTo(0, 0);
  }, [info]);

  return (
    <>
      <div
        className="container mx-auto p-5 bg-white rounded-lg shadow-md mt-10 mb-20"
        style={{ maxWidth: '80%', minHeight: '80vh' }}
      >
        <div className="flex flex-col items-center my-10">
          <span className="text-2xl font-semibold text-center">
            {info.title}
          </span>
          <div className="mt-4 flex flex-col items-start">
            <span className="text-md text-gray-600">
              시행 일자 | {formattedDate}
            </span>
            <span className="text-md text-gray-600 mt-1">
              질답 횟수 | {count}회
            </span>
          </div>
          <div className="w-1/2 h-0.5 bg-gray-400 mt-4"></div>
        </div>

        <div className="flex justify-center items-center mb-20 pl-2">

        <div 
          className='w-[500px] h-[80px] border rounded-xl font-bold bg-blue-400 text-white flex justify-center items-center hover:bg-blue-500 hover:shadow-lg transition duration-300 ease-in-out'
          onClick={openModal} 
        >
          {article.title}
        </div>



           {/* 모달 컴포넌트 */}
          <Modal show={isOpen} onClose={closeModal}>
            <Modal.Header>
              {article.title}
            </Modal.Header>
            <Modal.Body>
              <p>{article.content}</p>
            </Modal.Body>
            <Modal.Footer>
              <button 
                onClick={closeModal} 
                className="bg-blue-500 text-white px-4 py-2 rounded ml-auto"
              >
                닫기
              </button>
            </Modal.Footer>
          </Modal>
        </div>


        <VerticalTimeline
          lineColor="#000000"
          layout="1-column-left"
          className="custom-timeline"
          style={{ marginLeft: '20%' }} // 타임라인 위치 조정
        >
          {reportDetail.map((content, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{
                padding: '0',
                boxShadow: 'none',
                margin: '0',
                marginLeft: '13%', // 카드 위치 조정
                width: '80%', // 카드 크기 조정
              }}
              contentArrowStyle={{ display: 'none' }}
              iconStyle={{
                background: '#d1d5db',
                color: '#000',
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                padding: '13px',
              }}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="#808080"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              }
              style={{ marginBottom: '10px' }}
              position="right" // 카드를 타임라인의 오른쪽에 표시
            >
              <Card className="mb-5 shadow-none border !border-gray-400">
                <div className="flex">
                  <div className="flex">
                    {Object.entries(content.expression).map(([emotion, value]) => (
                      <div key={emotion} className="flex flex-col items-center">
                        <img
                          src={getEmotionImageColor(emotion)}
                          alt={emotion}
                          className="w-10 h-10 mr-2"
                         
                        />
                        <span className="pr-1 pt-1 text-sm">
                          {(value * 100).toFixed(0)}%
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="ml-auto flex flex-col items-end pt-2">
                    <div>
                      <span className="pr-2 text-base text-gray-700">
                        발음점수
                      </span>
                      <span className="font-bold text-xl">
                        {content.pronunciationScore}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full border-b-2 border-gray-400 pb-1 flex items-center gap-2">
                  <span className="text-2xl font-medium">Q.</span>
                  <span className="text-xl font-semibold">{content.question}</span>
                </div>
                <div className="w-full border-b-2 border-gray-400 pb-1 flex gap-2">
                  <span className="text-2xl font-medium">A.</span>
                  <span className="text-md text-gray-700 pb-2">{content.answer}</span>
                </div>
                <div className="w-full border-b-2 border-gray-400 pb-1 flex gap-2">
                  <div className="text-2xl font-medium mb-2">F.</div>
                  <div className="text-md font-semibold text-blue-500 pb-2">
                    {content.feedback}
                  </div>
                </div>
              </Card>
            </VerticalTimelineElement>
          ))}
          <VerticalTimelineElement
            iconStyle={{ background: '#808080', color: '#fff' }}
            style={{ marginBottom: '10px' }}
          />
        </VerticalTimeline>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .custom-timeline {
            margin-left: 10%; /* 타임라인 위치 조정 */
          }
          .vertical-timeline-element--work .vertical-timeline-element-content {
            margin-left: 10%; /* 카드 위치 조정 */
            width: 80%; /* 카드 너비 조정 */
          }
        }
      `}</style>
    </>
  );
}
