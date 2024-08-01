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
}) {
  const videoElement = useRef(null);
  // 표정 표시를 위한 변수
  const canvasRef = useRef();
  const [faceExpression, setFaceExpression] = useState("neutral");
  const faceEmotionIcon = {
    angry: "angry_2274563.png",
    disgust: "vomiting_3688154.png",
    fear: "dead_3746935.png",
    happy: "happy_9294644.png",
    sad: "sadness_7198866.png",
    surprised: "surprised_3898405.png",
    neutral: "neutral_3688059.png",
  };

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

  return (
    <>
      {local ? (
        <img src={"/emotion/" + faceEmotionIcon[faceExpression]} alt="" />
      ) : null}
      <div
        id={"camera-" + participantIdentity}
        className="rounded bg-gray-300 relative"
      >
        <video
          ref={videoElement}
          id={track.sid}
          className="rounded"
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
          className="hidden"
          ref={canvasRef}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
        <p className="text-center text-gray-600 py-4">
          {participantIdentity + (local ? " (You)" : "")}
        </p>
      </div>
    </>
  );
}
