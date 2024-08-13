import { useEffect, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Card } from 'flowbite-react';
import { getEmotionImage } from '../../../util/get-emotion-image';

export default function PersonalityFeedback() {

  const APIURL = "https://i11c201.p.ssafy.io:8443/api/v1/";
  const location = useLocation();
  const info = location.state?.info;  // 면접정보(레포트ID, 면접종류, 총점, 발음점수, 면접일시)
  const [count, setCount] = useState(0)
  const [reportDetail, setReportDetail] = useState([])
  const Token = localStorage.getItem('Token')

  useEffect(() => {
    axios.
    get(`${APIURL}report/${info.reportId}`,
      {headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
    .then((res) => {
      console.log(res.data.response);
      setCount(res.data.response.qnaCount)
      setReportDetail(res.data.response.reportDetails)
    })
    .catch((error) => {
      console.log(error);
    })
    // 페이지 로드 시 화면을 맨 위로 스크롤
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
      <div className="container mx-auto p-5 bg-white rounded-lg shadow-md mt-10 mb-20" style={{ maxWidth: '80%', minHeight: '80vh' }}>
      <div className='flex flex-col items-center my-10'>
        <span className="text-2xl font-semibold text-center">{info.title}</span>
        <div className='mt-4 flex flex-col items-start'>
          <span className="text-md text-gray-600">시행 일자 | {info.createDate}</span>
          <span className="text-md text-gray-600 mt-1">질답 횟수 | {count}회</span>
        </div>
        <div className="w-1/2 h-0.5 bg-gray-400 mt-4"></div>
      </div>

        <VerticalTimeline
          lineColor="#000"
          className="ml-[-150px]" 
        >
          {reportDetail.map((content, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{ padding: '0', boxShadow: 'none', margin: '0' }}
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
                padding: '13px'
              }}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="#808080" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              }
              style={{ marginBottom: '10px' }}
              position="right"
            >
              <Card className="mb-5 w-full shadow-none">
                <div className='flex'>
                  <div className='flex'>
                  {Object.entries(content.expression).map(([emotion, value]) => (
                    <div key={emotion} className='flex flex-col items-center'>
                      <img 
                        src={getEmotionImage(emotion)} 
                        alt={emotion} 
                        className="w-10 h-10 mr-2" 
                        style={{ filter: 'invert(100%)' }} 
                      />
                      <span className='pr-1 pt-1 text-sm'>{(value * 100).toFixed(2)}%</span>
                    </div>
                  ))}
                  </div>

                  <div className='ml-auto flex flex-col items-end pt-2'>
                    <div>
                      <span className='pr-2 text-base text-gray-700'>발음점수</span>
                      <span className='font-bold text-xl'>{content.pronunciationScore}</span>
                    </div>
                  </div>
                </div>

                <div className='w-full border-b-2 border-gray-400 pb-1 flex items-center gap-2'>
                  <span className='text-2xl font-medium'>Q.</span>
                  <span className='text-xl font-semibold'>{content.question}</span>
                </div>
                <div className='w-full border-b-2 border-gray-400 pb-1 flex gap-2'>
                  <span className='text-2xl font-medium'>A.</span>
                  <span className='text-md text-gray-700 pb-2'>{content.answer}</span>
                </div>
                <div className='w-full border-b-2 border-gray-400 pb-1 flex gap-2'>
                  <div className='text-2xl font-medium mb-2'>F.</div>
                  <div className='text-md font-semibold text-blue-500 pb-2'>{content.feedback}</div>
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
    </>
  );
}
