import React from "react";
import { useState, useEffect } from "react";
import VideoComponent from "./VideoComponent";
import AudioComponent from "./AudioComponent";
import submitIcon from "../../../../../public/main/submitIcon.png";
import botImg from "../../../../../public/main/botImg.jpg";
import {
  startRecording,
  stopRecording,
  pronunciationEvaluation,
  base64String,
  pronunciationScore,
} from "./VoicePronunciationRecord";

export default function TwoParticipantsVideo({
  localTrack,
  participantName,
  remoteTracks,
  handleEndInterview,
  isListening,
  startListening,
  stopListening,
  questions,
  questionCount,
  answer,
  faceExpressionData,
  handleSubmitAnswer,
  handleStartSurvey,
  userInfo,
  userList,
  userTurn,
  userNameMap,
  setModalOpen,
  setEvaluationModal,
}) {
  const [faceExpression, setFaceExpression] = useState("neutral");
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    // console.log("remoteTracks 재확인: ", remoteTracks);
  }, [remoteTracks]); // remoteTracks가 변경될 때마다 로그 출력

  useEffect(() => {
    startRecording(); // 방에 들어오자마자 녹화 시작
    setIsRecording(true);
  }, []);

  const faceEmotionIcon = {
    angry: "angry_2274563.png",
    disgusted: "vomiting_3688154.png",
    fearful: "dead_3746935.png",
    happy: "happy_9294644.png",
    sad: "sadness_7198866.png",
    surprised: "surprised_3898405.png",
    neutral: "neutral_3688059.png",
  };

  // 면접 화면일 경우에만 표정 모델 로드하도록 URL 끝값을 체크
  const url = location.pathname;
  const urlCheck = url.substring(url.length - 3);

  const handleButtonClick = async () => {
    if (isRecording) {
      stopRecording(); // 녹음 중지
      setIsRecording(false);
      try {
        const score = await pronunciationEvaluation(base64String);
        handleSubmitAnswer(
          questions[questionCount],
          answer,
          faceExpressionData,
          score
        );
        // 이정준
        // handleNextQuestion()
      } catch (error) {
        console.error("Error during pronunciation evaluation: ", error);
      } finally {
        startRecording(); // 평가가 끝나면 다시 녹음 시작
        setIsRecording(true);
      }
    }
  };

  const currentTurnId = userList[userTurn];
  const currentTurnUserName = userNameMap[currentTurnId];
  const nextTurnUserName = userNameMap[userList[userTurn + 1]];
  // console.log("현재 면접 순서인 ID :", currentTurnId);
  // console.log("현재 면접 순서인 사람 :", currentTurnUserName);
  // console.log(`다음 면접 순서인 사람 : ${nextTurnUserName ? nextTurnUserName : "마지막 차례"}`)

  const styles = `
  @keyframes lightBlueBlink {
    0% {
      box-shadow: 0 0 10px rgba(135, 206, 270, 0.7), 0 0 20px rgba(135, 206, 270, 0.7);
    }
    50% {
      box-shadow: 0 0 20px rgba(135, 206, 270, 1.0), 0 0 30px rgba(135, 206, 270, 1.0);
    }
    100% {
      box-shadow: 0 0 10px rgba(135, 206, 270, 0.7), 0 0 20px rgba(135, 206, 270, 0.7);
    }
  }

  .current-turn {
    animation: lightBlueBlink 1s infinite;
  }
  `;
  // 내 차례일 때에는 불빛을 비칠 수 있지만, 다른 참여자의 경우에는 Name이 없으므로 할 수 없다.
  return (
    <>
      <style>{styles}</style> {/* 애니메이션 스타일 추가 */}
      <div className="w-1/2 bg-gray-300 rounded-2xl mr-5 flex justify-center items-end relative">
        {/* <div className="absolute top-4 left-4 bg-gray-500 bg-opacity-50 text-white rounded-xl px-4 py-2 text-xs z-10">
          You
        </div> */}
        {localTrack && (
          <div className="w-full h-full">
            <VideoComponent
              track={localTrack}
              participantIdentity={participantName}
              local={true}
              // 표정 상태 변경을 VideoComponent로 전달
              onFaceExpressionChange={setFaceExpression}
              isSurveyTarget={currentTurnUserName === participantName}
            />
          </div>
        )}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
          <button
            className="p-3 bg-gray-700 bg-opacity-50 rounded-full w-12 h-12"
            // 변경해야 할곳 2
            onClick={() => setEvaluationModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 26 26"
            >
              <path
                fill="white"
                strokeWidth="0.1"
                d="M8.813 0A1 1 0 0 0 8 1v1H4.406C3.606 2 3 2.606 3 3.406V24.5c0 .9.606 1.5 1.406 1.5H21.5c.8 0 1.406-.606 1.406-1.406V3.406c.1-.8-.512-1.406-1.312-1.406H18V1a1 1 0 0 0-1-1H9a1 1 0 0 0-.094 0a1 1 0 0 0-.094 0zM10 2h6v2h-6zM5 4h3v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4h3v20H5zm2 5v4h4V9zm1 1h2v2H8zm5 0v2h6v-2zm-6 5v4h4v-4zm6 1v2h6v-2z"
              ></path>
            </svg>
          </button>
          {/* <button
            onClick={isListening ? stopListening : startListening}
            className={`px-4 py-2 rounded ${isListening ? 'bg-red-500' : 'bg-green-500'} text-white`}
          >
            {isListening ? '인식 중지' : '인식 시작'}
          </button> */}
          <button
            className={`p-3 rounded-2xl w-[55px] h-[55px] flex justify-center items-center ${
              Number(currentTurnId) === Number(userInfo.userId)
                ? isRecording
                  ? "bg-green-500 hover:bg-green-700"
                  : "bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleButtonClick}
            title="이 버튼을 클릭하면 답변이 제출됩니다."
            disabled={Number(currentTurnId) !== Number(userInfo.userId)}
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
              className="text-white"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M2 14.959V9.04C2 8.466 2.448 8 3 8h3.586a.98.98 0 0 0 .707-.305l3-3.388c.63-.656 1.707-.191 1.707.736v13.914c0 .934-1.09 1.395-1.716.726l-2.99-3.369A.98.98 0 0 0 6.578 16H3c-.552 0-1-.466-1-1.041M16 8.5c1.333 1.778 1.333 5.222 0 7M19 5c3.988 3.808 4.012 10.217 0 14"
              ></path>
            </svg> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
              />
            </svg>
          </button>
          <button
            className="p-3 bg-red-500 hover:bg-red-700 rounded-2xl w-[55px] h-[55px] flex items-center justify-center"
            onClick={handleEndInterview}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
              className="text-white"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
              >
                <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2"></path>
                <path d="M9 12h12l-3-3m0 6l3-3"></path>
              </g>
            </svg>
          </button>
          <button className="p-3 bg-gray-700 bg-opacity-50 rounded-full w-12 h-12">
            {/* 표정 이모티콘 */}
            {localTrack && urlCheck === "/pt" && (
              <img
                src={`/emotion/${faceEmotionIcon[faceExpression]}`}
                alt="face expression"
                className="w-full h-full object-contain"
              />
            )}
          </button>
        </div>
      </div>
      <div className={"w-1/2 h-full"}>
        {remoteTracks.length < 2 ? (
          <div className=" mb-2 rounded-2xl flex items-center justify-center w-full h-full bg-gray-300">
            <img
              src={botImg}
              alt="Bot"
              className="w-44 h-44 rounded-full object-contain bg-blue-500"
            />
          </div>
        ) : (
          // 추가된 부분: remoteTracks를 감싸는 외부 <div> 추가
          <div className=" mb-2 rounded-2xl flex items-center justify-center w-full h-full bg-gray-400">
            {remoteTracks.map((remoteTrack) => {
              return remoteTrack.trackPublication.kind === "video" ? (
                <VideoComponent
                  key={remoteTrack.trackPublication.trackSid}
                  track={remoteTrack.trackPublication.videoTrack}
                  participantIdentity={remoteTrack.participantIdentity}
                  local={false}
                  isSurveyTarget={
                    currentTurnUserName === remoteTrack.participantIdentity
                  }
                />
              ) : (
                <AudioComponent
                  key={remoteTrack.trackPublication.trackSid}
                  track={remoteTrack.trackPublication.audioTrack}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
