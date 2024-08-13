import React from "react";
import { useState, useEffect } from "react";
import VideoComponent from "./VideoComponent";
import AudioComponent from "./AudioComponent";
import {
  startRecording,
  stopRecording,
  pronunciationEvaluation,
  base64String,
  pronunciationScore,
} from "./VoicePronunciationRecord";

export default function ThreeParticipantsVideo({
  localTrack,
  participantName,
  remoteTracks,
  handleEndInterview,
  isListening,
  startListening,
  stopListening,
  questions,
  answer,
  faceExpressionData,
  handleSubmitAnswer,
  handleStartSurvey,
  userInfo,
  userList,
  userTurn,
  userNameList,
  setModalOpen,
}) {
  useEffect(() => {
    console.log("remoteTracks 재확인: ", remoteTracks);
  }, [remoteTracks]); // remoteTracks가 변경될 때마다 로그 출력

  const [faceExpression, setFaceExpression] = useState("neutral");
  const [isRecording, setIsRecording] = useState(false);

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

  const groupedTracks = remoteTracks.reduce((acc, track) => {
    const participant = track.participantIdentity;
    if (!acc[participant]) {
      acc[participant] = { audio: null, video: null };
    }
    if (track.trackPublication.kind === "video") {
      acc[participant].video = track;
    } else if (track.trackPublication.kind === "audio") {
      acc[participant].audio = track;
    }
    return acc;
  }, {});

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
          questions[0],
          answer,
          faceExpressionData,
          pronunciationScore
        );
      } catch (error) {
        console.error("Error during pronunciation evaluation: ", error);
      } finally {
        startRecording(); // 평가가 끝나면 다시 녹음 시작
        setIsRecording(true);
      }
    }
  };

  const styles = `
  @keyframes indigoBlink {
    0% {
      box-shadow: 0 0 10px rgba(75, 0, 130, 0.5), 0 0 20px rgba(75, 0, 130, 0.5);
    }
    50% {
      box-shadow: 0 0 20px rgba(75, 0, 130, 0.8), 0 0 30px rgba(75, 0, 130, 0.8);
    }
    100% {
      box-shadow: 0 0 10px rgba(75, 0, 130, 0.5), 0 0 20px rgba(75, 0, 130, 0.5);
    }
  }

  .current-turn {
    animation: indigoBlink 1s infinite;
    padding: 5px;
  }
  `;

  const currentTurnId = userList[userTurn]
  const currentTurnUserName = userNameList[userTurn]
  console.log("현재 면접 순서인 ID :", currentTurnId)
  console.log("현재 면접 순서인 사람 :", currentTurnUserName)


  return (
    <>
      <style>{styles}</style>
      <div className="w-2/3 bg-gray-300 rounded-2xl mr-2 flex justify-center items-end relative">
        {/* <div className="absolute top-4 left-4 bg-gray-500 bg-opacity-50 text-white rounded-xl px-4 py-2 text-xs z-10">
          You
        </div> */}
        {localTrack && (
          <div className="w-full h-full">
            <VideoComponent
              track={localTrack}
              participantIdentity={participantName}
              local={true}
              onFaceExpressionChange={setFaceExpression}
              isSurveyTarget={participantName === currentTurnUserName}
            />
          </div>
        )}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
          <button
            className="p-3 bg-gray-700 bg-opacity-50 rounded-full w-12 h-12"
            // 변경해야 할곳 2
            onClick={setModalOpen}
            // onClick={handleStartSurvey}
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
          <button
            className={`p-3 bg-green-500 rounded-2xl w-[55px] h-[55px] flex justify-center items-center ${
              isListening ? "bg-green-700" : "bg-green-500"
            } hover:bg-green-700`}
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
      <div className="w-1/3 h-full">
        {Object.entries(groupedTracks).map(([participant, tracks]) => (
          <div
            key={participant}
            className="h-[48%] bg-gray-400 mb-3 rounded-2xl flex flex-col items-center justify-center"
          >
            {tracks.video && ( // 변경된 부분: 비디오 트랙 렌더링
              <VideoComponent
                track={tracks.video.trackPublication.videoTrack}
                participantIdentity={participant}
                local={false}
                isSurveyTarget={participant === currentTurnUserName}
              />
            )}
            {tracks.audio && ( // 변경된 부분: 오디오 트랙 렌더링
              <AudioComponent
                track={tracks.audio.trackPublication.audioTrack}
              />
            )}
          </div>
        ))}
        {/* 여기까지 변경된 부분 */}
        {/* {remoteTracks.map((remoteTrack) =>
          remoteTrack.trackPublication.kind === "video" ? (
            <div
              key={remoteTrack.trackPublication.trackSid}
              className="h-[48%] bg-gray-400 mb-2 rounded-2xl"
            >
              <VideoComponent
                track={remoteTrack.trackPublication.videoTrack}
                participantIdentity={remoteTrack.participantIdentity}
                local={false}
                isFullParticipants={isFullParticipants}
              />
            </div>
          ) : (
            <div
              key={remoteTrack.trackPublication.trackSid}
              className="h-[48%] bg-gray-400 mb-2 rounded-2xl"
            >
              <AudioComponent
                key={remoteTrack.trackPublication.trackSid}
                track={remoteTrack.trackPublication.audioTrack}
              />
            </div>
          )
        )} */}
      </div>
    </>
  );
}
