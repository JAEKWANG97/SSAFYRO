import { useEffect, useRef, useState } from "react";
import { LocalVideoTrack, RemoteVideoTrack } from "livekit-client";
// VideoComponent Style Sheet
import "./VideoComponent.css";
// face-api.js function import
import { loadFaceAPIModels, handleVideoPlay } from "./VideoFaceApi";

export default function VideoComponent({
  track,
  participantIdentity,
  local = false,
  // 표정 상태 변경을 부모에게 알림
  onFaceExpressionChange,
  isSurveyTarget
}) {
  const videoElement = useRef(null);
  // 표정 표시를 위한 변수
  const canvasRef = useRef();
  const [faceExpression, setFaceExpression] = useState("neutral");

  // ParticipantsVideo.jsx로 옮김
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

  useEffect(() => {
    if (videoElement.current) {
      track.attach(videoElement.current);
    }

    if (local) {
      loadFaceAPIModels();
    }

    return () => {
      track.detach();
    };
  }, [track]);

  useEffect(() => {
    // 표정 상태 변경 시 부모 컴포넌트에 알림
    if (onFaceExpressionChange) {
      onFaceExpressionChange(faceExpression)
    }
  }, [faceExpression, onFaceExpressionChange])

  // CSS 애니메이션 정의 (인디고 색상의 그라데이션 깜빡임)
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

  return (
    <>
      {/* {local && urlCheck === "/pt" ? (
        <img
          src={"/emotion/" + faceEmotionIcon[faceExpression]}
          // 고쳐야할점 3
          className="w-[30px] m-auto pb-5 absolute z-10 top-10 left-10"
          alt=""
        />
      ) : null} */}
      <div
        id={"camera-" + participantIdentity}
        className={`relative rounded-2xl h-full ${isSurveyTarget ? "current-turn" : ""}`}
      >
        <video
          ref={videoElement}
          id={track.sid}
          className="rounded-2xl object-cover w-full h-full"
          width={"200px"}
          height={"200px"}
          onCanPlayThrough={
            local
              ? () =>
                  handleVideoPlay(videoElement, canvasRef, setFaceExpression)
              : null
          }
        ></video>
        <div
          className="absolute top-4 left-4 hidden"
          ref={canvasRef}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
        <p className="absolute top-0 left-0 m-2 text-center text-white py-1 px-2 bg-gray-500 bg-opacity-50 rounded-lg text-xs">
          {participantIdentity + (local ? " (You)" : "")}
        </p>
      </div>
    </>
  );
}
