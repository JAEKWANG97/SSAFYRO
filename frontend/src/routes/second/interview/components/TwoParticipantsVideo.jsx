import React from "react";
import { useState, useEffect } from "react";
import VideoComponent from "./VideoComponent";
import AudioComponent from "./AudioComponent";
// import botImg from "../../../../../public/main/botImg3.png";
import botImg from "../../../../../public/main/botImg.jpg";
import {
  startRecording, // 녹음을 시작하는 함수
  stopRecording, // 녹음을 중지하는 함수
  pronunciationEvaluation, // 발음 평가를 수행하는 함수
  base64String, // 녹음된 데이터를 base64 문자열로 변환하는 변수
  pronunciationScore, // 발음 평가 점수를 저장하는 변수
} from "./VoicePronunciationRecord";

export default function TwoParticipantsVideo({
  localTrack,
  participantName,
  remoteTracks,
  handleEndInterview, // 면접 종료를 처리하는 함수
  isListening, // 현재 음성 인식이 활성화되었는지 여부를 나타내는 상태
  startListening, // 음성 인식을 시작하는 함수
  stopListening, // 음성 인식을 중지하는 함수
  questions, // 질문 리스트
  answer, // 사용자가 제공한 답변
  faceExpressionData, // 사용자의 표정 데이터를 저장하는 변수
  handleSubmitAnswer, // 답변 제출을 처리하는 함수
  handleStartSurvey,
  userInfo,
  userList,
  userTurn,
  userNameMap,
  setModalOpen,
  setEvaluationModal,
  questionCount,
  recognitionRef,
  setTranscript, // 음성 인식된 텍스트를 설정하는 함수
}) {
  const [faceExpression, setFaceExpression] = useState("neutral"); // 표정 상태를 관리하는 상태 변수
  const [isRecording, setIsRecording] = useState(false); // 녹음 상태를 관리하는 상태 변수

  useEffect(() => {
    // console.log("remoteTracks 재확인: ", remoteTracks);
  }, [remoteTracks]); // remoteTracks가 변경될 때마다 로그 출력

  useEffect(() => {
    startRecording(); // 컴포넌트가 마운트되면 즉시 녹음을 시작
    console.log("녹음 시작");
    setIsRecording(true); // 녹음 상태를 true로 설정
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
    console.log("녹음 버튼 클릭");
    if (isRecording) {
      console.log("녹음 중지");
      stopRecording(); // 녹음 중지
      setIsRecording(false); // 녹음 상태를 false로 설정
      stopListening(); // 음성 인식 중지
      try {
        console.log(answer);
        await pronunciationEvaluation(base64String); // 녹음된 데이터를 발음 평가
        handleSubmitAnswer(
          questions[questionCount],
          answer,
          faceExpressionData,
          pronunciationScore // 발음 평가 점수를 포함하여 답변 제출
        );
        setTranscript(""); // STT로 변환된 텍스트를 초기화
      } catch (error) {
        console.error("Error during pronunciation evaluation: ", error);
      } finally {
        console.log("평가 완료");
        startRecording(); // 평가가 끝나면 다시 녹음 시작
        setIsRecording(true); // 녹음 상태를 true로 설정
        startListening(); // 음성 인식 재시작
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
      box-shadow: 0 0 10px rgba(135, 206, 235, 0.5), 0 0 20px rgba(135, 206, 235, 0.5);
    }
    50% {
      box-shadow: 0 0 20px rgba(135, 206, 235, 0.8), 0 0 30px rgba(135, 206, 235, 0.8);
    }
    100% {
      box-shadow: 0 0 10px rgba(135, 206, 235, 0.5), 0 0 20px rgba(135, 206, 235, 0.5);
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
              isRecording ? "bg-green-700" : "bg-green-500"
            } hover:bg-green-700`}
            // 녹음 및 음성 인식 처리 시작
            onClick={handleButtonClick}
          >
            <svg
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
            </svg>
          </button>
          <button
            className="p-3 bg-red-500 rounded-2xl w-[55px] h-[55px] flex items-center justify-center"
            onClick={handleEndInterview} // 면접 종료 처리
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
                  isSurveyTarget={currentTurnUserName === remoteTrack.participantIdentity}
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
