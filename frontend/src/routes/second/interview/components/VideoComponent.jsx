import { useEffect, useRef } from "react";
import { LocalVideoTrack, RemoteVideoTrack } from "livekit-client";
// VideoComponent Style Sheet
import "./VideoComponent.css";
// face-api.js function import
import {
  loadFaceAPIModels,
  handleVideoPlay,
  faceExpression,
} from "./VideoFaceApi";

export default function VideoComponent({
  track,
  participantIdentity,
  local = false,
}) {
  const videoElement = useRef(null);
  const canvasRef = useRef();

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
        <p className="text-center text-gray-600 py-4">{faceExpression}</p>
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
            local ? () => handleVideoPlay(videoElement, canvasRef) : null
          }
        ></video>
        <div
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
