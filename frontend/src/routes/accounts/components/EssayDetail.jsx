import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from 'flowbite-react';
import Button from "../../../components/Button";

export default function EssayDetail() {
  const APIURL = "https://i11c201.p.ssafy.io:8443/api/v1/";
  const Token = localStorage.getItem("Token");

  const [essayData, setEssayData] = useState("");
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const [editedEssayData, setEditedEssayData] = useState(""); // 수정된 에세이 데이터
  const [question, setQuestion] = useState(""); // 에세이 질문
  const [essayId, setEssayId] = useState(1)

  useEffect(() => {
    const fetchEssayDetails = async () => {
      try {
        const userInfoResponse = await axios.get(`${APIURL}users`, {
          headers: { Authorization: `Bearer ${Token}` },
        });

        const userInfo = userInfoResponse.data.response;
        const userType = userInfo.type;

        const questionResponse = await axios.get(`${APIURL}essay-questions`, {
          params: {
            type: userType, 
            generation: 11 
          },
          headers: { Authorization: `Bearer ${Token}` },
        });

        const questionData = questionResponse.data.response;
        setQuestion(questionData.content);
        setEssayId(questionData.id)

        const Info = localStorage.getItem('userInfo');
        if (Info) {
          const parsedInfo = JSON.parse(Info);
          const userId = parsedInfo.userId;

          const essayResponse = await axios.get(`${APIURL}essays`, {
            params: { userId: userId },
            headers: { Authorization: `Bearer ${Token}` },
          });

          setEssayData(essayResponse.data.response.content);
          setEditedEssayData(essayResponse.data.response.content);
        }
      } catch (error) {
        console.error("Error fetching essay details:", error);
      }
    };

    fetchEssayDetails();
  }, [APIURL, Token]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedEssayData(essayData);
  };

  const handleSaveClick = async () => {
    try {
      const afterEssay = {
        essayQuestionId: essayId, 
        content: editedEssayData,
      };

      await axios.post(`${APIURL}essays`, afterEssay, {
        headers: { Authorization: `Bearer ${Token}` },
      });

      setEssayData(editedEssayData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving essay data:", error);
    }
  };

  const handleTextareaChange = (event) => {
    setEditedEssayData(event.target.value);
  };

  return (
    <div>
      <Card>
        <div className="w-full border-b-2 border-gray-400 pb-1 flex flex-col items-center gap-2 font-bold pb-4">
          {question.split(',').map((part, index) => (
            <span key={index}>
              {part.trim()}
              {index !== question.split(',').length - 1 && <br />} 
            </span>
          ))}
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
            <div className="ml-3 text-gray-700" style={{ lineHeight: 1.8 }}>
              {essayData}
            </div>
          )}
        </div>
      </Card>
      {isEditing ? (
        <Button type='ESSAYSAVE' text='저장' onClick={handleSaveClick} />
      ) : (
        <Button type='ESSAYUPDATE' text='수정' onClick={handleEditClick} />
      )}
    </div>
  );
}
