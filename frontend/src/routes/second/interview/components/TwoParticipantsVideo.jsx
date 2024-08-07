import React from "react";
import { useEffect } from "react";
import VideoComponent from "./VideoComponent";
import AudioComponent from "./AudioComponent";
import botImg from "../../../../../public/main/botImg3.png";

const isFullParticipants = false;

export default function TwoParticipantsVideo({
  localTrack,
  participantName,
  remoteTracks,
  handleEndInterview,
  isListening,
  startListening,
  stopListening
}) {
  useEffect(() => {
    console.log("remoteTracks 재확인: ", remoteTracks);
  }, [remoteTracks]); // remoteTracks가 변경될 때마다 로그 출력
  return (
    <>
      <div className="w-1/2 bg-gray-300 rounded-2xl mr-5 flex justify-center items-end relative">
        <div className="absolute top-4 left-4 bg-gray-500 bg-opacity-50 text-white rounded-xl px-4 py-2 text-xs z-10">
          You
        </div>
        {localTrack && (
          <div className="w-full h-full">
            <VideoComponent
              track={localTrack}
              participantIdentity={participantName}
              local={true}
              isFullParticipants={isFullParticipants}
            />
          </div>
        )}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
          <button
            className="p-3 bg-gray-700 bg-opacity-50 rounded-full w-12 h-12"
            // 변경해야 할곳 2
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
          {/* <button
            onClick={isListening ? stopListening : startListening}
            className={`px-4 py-2 rounded ${isListening ? 'bg-red-500' : 'bg-green-500'} text-white`}
          >
            {isListening ? '인식 중지' : '인식 시작'}
          </button> */}
          <button className={`p-3 bg-green-500 rounded-2xl w-[55px] h-[55px] flex justify-center items-center ${isListening ? 'bg-green-700' : 'bg-green-500'} hover:bg-green-700`}
            onClick={isListening ? stopListening : startListening}
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
            {/* <img
              src={"/emotion/" + faceExpression + ".png"} // 이모티콘 이미지
              alt="face expression"
              className="w-full h-full object-contain"
            /> */}
          </button>
        </div>
      </div>
      <div className="w-1/2 h-full">
        {remoteTracks.length < 2 ? (
          <div className=" mb-2 rounded-2xl flex items-center justify-center w-full h-full bg-blue-500">
            <img
              src={botImg}
              alt="Bot"
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>
        ) : (
          // 추가된 부분: remoteTracks를 감싸는 외부 <div> 추가
          <div className=" mb-2 rounded-2xl flex items-center justify-center w-full h-full bg-gray-400">
            {remoteTracks.map((remoteTrack) =>
              remoteTrack.trackPublication.kind === "video" ? (
                <VideoComponent
                  key={remoteTrack.trackPublication.trackSid}
                  track={remoteTrack.trackPublication.videoTrack}
                  participantIdentity={remoteTrack.participantIdentity}
                  local={false}
                  isFullParticipants={isFullParticipants}
                />
              ) : (
                // 추가된 부분: <div> 위치 조정 및 중복 key 속성 제거
                <AudioComponent
                  key={remoteTrack.trackPublication.trackSid}
                  track={remoteTrack.trackPublication.audioTrack}
                />
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}
