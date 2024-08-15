import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import Button from "../../../components/Button";
import { EssayApi } from "../../../api/EssayApi";
import useUserStore from "../../../stores/userStore";

export default function EssayDetail() {
  const Token = localStorage.getItem("Token");
  const { userInfo, setUserInfo } = useUserStore();
  const nav = useNavigate()

  const [essayData, setEssayData] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedEssayData, setEditedEssayData] = useState("");
  const [essayId, setEssayId] = useState(null);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isEssayMissing, setIsEssayMissing] = useState(false);

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUserInfo && storedUserInfo.userId) {
      setUserId(storedUserInfo.userId);
    }

    const fetchEssayDetails = async () => {
      try {
        if (!userInfo) {
          const fetchedUserInfo = await EssayApi.getUserInfo(Token);
          setUserInfo(fetchedUserInfo);
        }

        setEssayId(11); // 예시로 하드코딩된 질문 ID를 사용합니다.

        if (storedUserInfo && storedUserInfo.userId) {
          const essayResponse = await EssayApi.getEssay();
          if (essayResponse.content) {
            setEssayData(essayResponse.content);
            setEditedEssayData(essayResponse.content);
          } else {
            setIsEssayMissing(true); // 응답이 없을 경우 상태 변경
          }
        }
      } catch (error) {
        console.error("Error fetching essay details:", error);
        setError(error);
        setIsEssayMissing(true); // 오류 발생 시 상태 변경
      }
    };

    fetchEssayDetails();
  }, [Token, userInfo, setUserInfo]);

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
      await EssayApi.updateEssay(Token, afterEssay);

      setEssayData(editedEssayData);
      setIsEditing(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleTextareaChange = (event) => {
    setEditedEssayData(event.target.value);
  };

  return (
    <div>
    {isEssayMissing ? ( // 상태에 따라 조건부 렌더링
            <div className="flex items-center justify-center pt-7">
              <div
              className="w-[500px] h-[200px] rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer transition-shadow hover:shadow-lg"
              style={{ backgroundColor:"rgba(240, 240, 240, 0.8)"  }}
              onClick={()=>{nav('/first/essay')}}
            >
              <span className="text-xl text-gray-500 font-semibold text-center pb-1">에세이</span>
              <div className="flex items-center gap-2">
                <span className="text-xl text-gray-500 font-semibold text-center">작성하러 가기</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
              </div>
            </div>
          </div>
    ) : (
      <Card>
        <div className="w-full border-b-2 border-gray-400 pb-1 flex flex-col items-center gap-2 font-bold pb-4">
          {userInfo?.type === "MAJOR" ? (
            <>
              <span>향후 어떤 SW 개발자로 성장하고 싶은지 SW 관련 경험을 토대로 기술하고</span>
              <span>SSAFY에 지원하신 동기에 대해서도 작성 바랍니다.</span>
              <span className="text-center">(500자 내외/최대 600자 까지)</span>
            </>
          ) : (
            <>
              <span>학업 및 취업준비를 하며 가장 어려웠던 경험과 이를 해결하기 위해 했던</span>
              <span>노력을 기술하고 SSAFY에 지원하신 동기에 대해서도 작성 바랍니다.</span>
              <span className="text-center">(500자 내외/최대 600자 까지)</span>
            </>
          )}
        </div>
        <div className="w-full">
          {isEditing ? (
            <textarea
              className="w-full p-2 border border-black rounded-lg outline-none focus:border-black focus:ring-0"
              rows="10"
              spellCheck="false"
              autoCorrect="off"
              autoComplete="off"
              style={{
                lineHeight: 1.8,
                height: "25rem",
                width: "100%",
                resize: "none",
              }}
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
    )}
    {isEditing && !isEssayMissing ? (
      <Button type="ESSAYSAVE" text="저장" onClick={handleSaveClick} />
    ) : (
      !isEssayMissing && <Button type="ESSAYUPDATE" text="수정" onClick={handleEditClick} />
    )}
  </div>
);
}