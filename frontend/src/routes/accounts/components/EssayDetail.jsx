import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from 'flowbite-react';
import Button from "../../../components/Button";

export default function EssayDetail() {
  const [essayQuestion, setEssayQuestion] = useState(null);
  const [essayData, setEssayData] = useState(null); // 불러온 에세이 데이터 
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const [editedEssayData, setEditedEssayData] = useState(""); // 수정된 에세이 데이터
  const [essayId, setEssayId] = useState(1);
  const APIURL = "https://i11c201.p.ssafy.io:8443/api/v1/essays";

  const mockquestion = '향후 어떤 SW 개발자로 성장하고 싶은지 SW 관련 경험을 토대로 기술하고, SSAFY에 지원하신 동기에 대해서도 작성 바랍니다.';
  const mockdata =
    '저는 단순한 불편함을 넘어서 근본적인 문제를 발견하고 해결하는 개발자로 성장하고자 합니다. 대학교 빅데이터 분석 수업에서의 도전, 송파구 대피소 최적화 프로젝트는 이러한 철학을 실천하는데 중요한 경험이였습니다. 5명 중 4명이 미참여한 이 프로젝트에서, 저는 데이터 분석을 통해 대피소 할당 문제의 본질을 파악하고 k-means 알고리즘을 변형 후 적용하여 실질적인 해결책을 찾았습니다. 이 과정에서 저는 복잡한 문제를 깊이 분석하고, 창의적으로 해결하는 능력을 키웠습니다. ssafy의 알고리즘 교육은 복잡한 문제에 대한 깊은분석 능력을 키우는 데 중요한 역할을 할 것입니다. 자기주도적 프로젝트를 통해 실제 세계의 문제에 대한 실질적인 해결책을 개발하는 능력을 강화할 수 있을 것으로 기대합니다. 또한 ssafy 프로그램을 통해 취업 기회를 얻고, 제가 개발한 솔루션을 실제로 배포할 수 있는 능력을 배우는 것은 저에게 큰 가치가 될 것입니다. ssafy에서의 교육과 경험은 제가 더 깊이 있는 문제해결 능력을 갖춘 개발자로 성장하는데 중요한 발판이 될 것이며, 이는 제 장래 취업 목표 달성에도 크게 기여할 것입니다.'

  useEffect(() => {
    const Token = localStorage.getItem("Token");

    // Token 값을 URL의 파라미터로 전달
    axios
      .get(`${APIURL}/${Token}`, {
        headers: { Authorization: `Bearer ${Token}`}
      })
      .then((res) => {
        console.log(res.data);
        // setEssayId(res.data) // 에세이 질문 id 저장
        // setEssayQuestion(res.data) // 에세이 질문 내용 저장
        setEssayData(response.data.content); // 에세이 내용 저장
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // mockquestion을 ,로 분리하여 배열로 변환하고 문장 간 간격 조정
  const formattedQuestion = mockquestion.split(',').map((item, index) => (
    <span key={index} className="block mb-1 text-center">
      {item.trim()}
    </span>
  ));

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedEssayData(essayData || mockdata); // 현재 에세이 데이터를 수정할 데이터로 설정
                                              // api 연결 후, mockdata 삭제
  };

  const handleSaveClick = () => {
    setEssayData(editedEssayData);
    setIsEditing(false);

    const afterEssay = {
      essayQuestionId: essayId,
      content: essayData,
    };

    // 에세이 저장 요청
    const Token = localStorage.getItem("Token");

    axios
      .post(`${APIURL}essays`, afterEssay, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTextareaChange = (event) => {
    setEditedEssayData(event.target.value);
  };

  return (
    <div>
      <p className="text-2xl font-extrabold pb-1 mb-4 border-gray-400 px-10">
        {/* 에세이 */}
      </p>
      <Card className="mb-5">
        <div className="w-full border-b-2 border-gray-400 pb-1 flex flex-col items-center gap-2">
          <span className="font-bold text-gray-900">{formattedQuestion}</span>
        </div>
        
        <div className="w-full">
          {isEditing ? (
            <textarea
            className="w-full p-2 border border-black rounded-lg outline-none focus:border-black focus:ring-0"
            rows="10"
            spellCheck="false"
            autoCorrect="off"
            autoComplete="off"
            style={{ lineHeight: 1.8, height: "25rem", width: "100%", resize: 'none' }}
            value={editedEssayData}
            onChange={handleTextareaChange}
          />
          ) : (
            <div 
              className="ml-3 text-gray-700"
              style={{ lineHeight: 1.8 }}>
                {essayData || mockdata}</div>
          )} 
          {/* api 연결 후 mockData 삭제 */}
        </div>
      </Card>
      {isEditing ? (
        <Button
          type='ESSAYSAVE'
          text='저장'
          onClick={handleSaveClick}
        />
      ) : (
        <Button
          type='ESSAYUPDATE'
          text='수정'
          onClick={handleEditClick}
        />
      )}
    </div>
  );
}
