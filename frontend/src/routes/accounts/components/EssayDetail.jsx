import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import Button from "../../../components/Button";
import { EssayApi } from "../../../api/EssayApi";
import useUserStore from "../../../stores/userStore";

export default function EssayDetail() {
  const Token = localStorage.getItem("Token");
  const { userInfo, setUserInfo } = useUserStore();

  const [essayData, setEssayData] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedEssayData, setEditedEssayData] = useState("");
  const [question, setQuestion] = useState("");
  const [essayId, setEssayId] = useState(null);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

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

        const questionData = await EssayApi.getEssayQuestion(
          Token,
          userInfo.type,
          11
        );
        setQuestion(questionData.content);
        setEssayId(questionData.id);

        if (storedUserInfo && storedUserInfo.userId) {
          const essayResponse = await EssayApi.getEssay(
            Token,
            storedUserInfo.userId
          );
          setEssayData(essayResponse.content);
          setEditedEssayData(essayResponse.content);
          console.log(essayResponse);
        }
      } catch (error) {
        console.error("Error fetching essay details:", error);
        setError(error);
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
      console.log(afterEssay);
      await EssayApi.saveEssay(Token, afterEssay);

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
      <Card>
        <div className="w-full border-b-2 border-gray-400 pb-1 flex flex-col items-center gap-2 font-bold pb-4">
          {question.split(",").map((part, index) => (
            <span key={index}>
              {part.trim()}
              {index !== question.split(",").length - 1 && <br />}
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
      {isEditing ? (
        <Button type="ESSAYSAVE" text="저장" onClick={handleSaveClick} />
      ) : (
        <Button type="ESSAYUPDATE" text="수정" onClick={handleEditClick} />
      )}
    </div>
  );
}
