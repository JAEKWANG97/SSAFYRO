import { useEffect, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useLocation } from 'react-router-dom';
import { Card } from 'flowbite-react';
import axios from 'axios';
import { getEmotionImage } from '../../../util/get-emotion-image';

export default function PtFeedback() {
  const APIURL = "https://i11c201.p.ssafy.io:8443/api/v1/";
  const location = useLocation();
  const info = location.state?.info; // 이전 페이지에서 클릭한 면접 정보
  const [count, setCount] = useState(0)
  const [reportDetail, setReportDetail] = useState([])
  const [article, setArticle] = useState({})

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
      setArticle(res.data.response.article)
    })
    .catch((error) => {
      console.log(error);
    })
    // 페이지 로드 시 화면을 맨 위로 스크롤
    window.scrollTo(0, 0);
  }, []);


  // pt 주제에 대한 [간략한 주제, 질문, 답변, 피드백, 표정(표정과 %), 발음점수] 얻어와서 렌더링
  const ptContent = [
    {
      subject: '보안의 중요성, 블록체인',
      question: '해당 주제에 대한 너의 주장을 펼쳐라',
      answer: '저는 어쩌고 저쩌고 요렇게 저렇게 생각합니다.',
      feedback: '해당 주제에 대한 피드백 내용입니다.',
      expression: [
        { img: happyImg, percentage: 60 },
        { img: neutralImg, percentage: 30 },
        { img: surprisedImg, percentage: 10 },
      ],
      pronscore: 80,
    },
  ];

  // // 면접에 대한 [질문, 답변, 피드백, 표정(표정과 %), 발음점수] 얻어와서 렌더링
  // const allContent = [
  //   {
  //     question: '1분 자기소개를 해주세요.',
  //     answer:
  //       '안녕하세요, 저는 홍길동입니다. 저는 성실함과 책임감을 바탕으로 다양한 도전을 통해 성장해 왔습니다. 대학에서는 경영학을 전공하며 팀 프로젝트와 동아리 활동에서 리더 역할을 맡아 팀원들과 협력하여 목표를 달성하는 경험을 쌓았습니다. 특히, 지난 인턴십에서는 프로젝트 관리와 고객 대응 업무를 통해 문제 해결 능력을 키웠고, 이를 통해 팀의 성과를 높이는 데 기여했습니다. 앞으로도 제 강점인 분석력과 문제 해결 능력을 바탕으로 회사의 성장에 기여하고 싶습니다. 감사합니다.',
  //     feedback:
  //       '홍길동님의 자기소개는 매우 깔끔하고 효과적으로 자신의 강점과 경험을 잘 전달하고 있습니다. 그러나 더욱 강력한 인상을 남기기 위해 몇 가지 개선할 수 있는 부분이 있습니다. 아래는 제안된 피드백입니다.',
  //     expression: [
  //       { img: happyImg, percentage: 60 },
  //       { img: neutralImg, percentage: 30 },
  //       { img: surprisedImg, percentage: 10 },
  //     ],
  //     pronscore: 80,
  //   }
  // ];

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
              시행 일자 | {info.createDate}
            </span>
            <span className="text-md text-gray-600 mt-1">
              질답 횟수 | {count}회
            </span>
          </div>
          <div className="w-1/2 h-0.5 bg-gray-400 mt-4"></div>
        </div>

        <div className="flex justify-center items-center mb-20 pl-2">
        <Card className="mb-5 w-[600px] shadow-none border-4 border-black">
        <div className="flex">
              <div className="flex">
                {ptContent[0].expression.map((exp, expIndex) => (
                  <div key={expIndex} className="flex flex-col items-center">
                    <img
                      src={exp.img}
                      alt="expression"
                      className="w-10 h-10 mr-2"
                      style={{ filter: 'invert(100%)' }}
                    />
                    <span className="pr-1 pt-1 text-sm">{exp.percentage}%</span>
                  </div>
                ))}
              </div>

              <div className="ml-auto flex flex-col items-end pt-2">
                <div>
                  <span className="pr-2 text-base text-gray-700">발음점수</span>
                  <span className="font-bold text-xl">
                    {ptContent[0].pronscore}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full border-b-2 border-gray-400 pb-1 flex items-center gap-2">
              <span className="text-2xl font-medium">S.</span>
              <span className="text-xl font-semibold">
                {ptContent[0].subject}
              </span>
            </div>
            <div className="w-full border-b-2 border-gray-400 pb-1 flex items-center gap-2">
              <span className="text-2xl font-medium">Q.</span>
              <span className="text-xl font-semibold">
                {ptContent[0].question}
              </span>
            </div>
            <div className="w-full border-b-2 border-gray-400 pb-1 flex gap-2">
              <span className="text-2xl font-medium">A.</span>
              <span className="text-md text-gray-700 pb-2">
                {ptContent[0].answer}
              </span>
            </div>
            <div className="w-full border-b-2 border-gray-400 pb-1 flex gap-2">
              <div className="text-2xl font-medium mb-2">F.</div>
              <div className="text-md font-semibold text-blue-500 pb-2">
                {ptContent[0].feedback}
              </div>
            </div>
          </Card>
        </div>


        <VerticalTimeline lineColor="#000" className="ml-[-150px]">
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
              position="right"
            >
              <Card className="mb-5 w-full shadow-none">
                <div className="flex">
                  <div className="flex">
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
                  <div className="text-md font-semibold text-blue-500 pb-2">{content.feedback}</div>
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
