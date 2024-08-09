import { useEffect, useState } from "react";
import axios from "axios";

export default function EssayDetail() {
  const [essayQuestion, setEssayQuestion] = useState(null);
  const [essayData, setEssayData] = useState(null); // 불러온 에세이 데이터 
  const APIURL = "http://i11c201.p.ssafy.io:9999/api/v1/essays";

  const mockdata =
    '저는 단순한 불편함을 넘어서 근본적인 문제를 발견하고 해결하는 개발자로 성장하고자 합니다. 대학교 빅데이터 분석 수업에서의 도전, 송파구 대피소 최적화 프로젝트는 이러한 철학을 실천하는데 중요한 경험이였습니다. 5명 중 4명이 미참여한 이 프로젝트에서, 저는 데이터 분석을 통해 대피소 할당 문제의 본질을 파악하고 k-means 알고리즘을 변형 후 적용하여 실질적인 해결책을 찾았습니다. 이 과정에서 저는 복잡한 문제를 깊이 분석하고, 창의적으로 해결하는 능력을 키웠습니다. ssafy의 알고리즘 교육은 복잡한 문제에 대한 깊은분석 능력을 키우는 데 중요한 역할을 할 것입니다. 자기주도적 프로젝트를 통해 실제 세계의 문제에 대한 실질적인 해결책을 개발하는 능력을 강화할 수 있을 것으로 기대합니다. 또한 ssafy 프로그램을 통해 취업 기회를 얻고, 제가 개발한 솔루션을 실제로 배포할 수 있는 능력을 배우는 것은 저에게 큰 가치가 될 것입니다. ssafy에서의 교육과 경험은 제가 더 깊이 있는 문제해결 능력을 갖춘 개발자로 성장하는데 중요한 발판이 될 것이며, 이는 제 장래 취업 목표 달성에도 크게 기여할 것입니다.'

  useEffect(() => {
    const Token = localStorage.getItem("Token");

    // Token 값을 URL의 파라미터로 전달
    axios
      .get(`${APIURL}/${Token}`)
      .then((response) => {
        console.log(response.data);
        // setEssayQuestion(response.data) // 에세이 질문 저장
        setEssayData(response.data.content); // 에세이 내용 저장
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="border-t mt-4 py-10">
      <div className="pl-10">
        <p className="text-2xl font-extrabold inline-block border-b-4 border-gray-700">
          에세이
        </p>
      </div>
      <div className="border p-4 w-full max-w-xl mx-auto rounded-lg mt-4">
        질문
      </div>
      <div className="border p-4 w-full max-w-xl mx-auto rounded-lg mt-4">
        {/* <p className="text-base text-gray-700 leading-relaxed"> */}
          {mockdata}
        {/* </p> */}




        <div>
						<p className='text-2xl font-semibold border-b-2 pb-1 mb-4 border-gray-400'>문답과 피드백</p>
						{formData?.questions.map((question, index) => (
							<Card key={index} className='mb-5'>
								<div className='w-full border-b-2 border-gray-400 pb-1 flex items-center gap-2'>
									<span className='text-2xl font-semibold'>Q.</span>
									<span className='text-xl'>{question.question}</span>
								</div>
								<div className='w-full border-b-2 border-gray-400 pb-1 flex gap-2'>
									<span className='text-2xl font-semibold'>A.</span>
									<span className='text-md text-gray-700'>{question.answer}</span>
								</div>
								<div className='w-full'>
									<div className='text-xl font-semibold mb-2'>[피드백]</div>
									<div className='ml-3 text-teal-600'>{question.feedback}</div>
								</div>
							</Card>
						))}
					</div>
      </div>
    </div>
  );
}
