import { useEffect, useRef } from "react";
import { LocalVideoTrack, RemoteVideoTrack } from "livekit-client";
// VideoComponent Style Sheet
import "./VideoComponent.css";

export default function VideoComponent({
  track,
  participantIdentity,
  local = false,
}) {
  const videoElement = useRef(null);

  useEffect(() => {
    if (videoElement.current) {
      track.attach(videoElement.current);
    }

    return () => {
      track.detach();
    };
  }, [track]);

  return (
    <>
      <div id={"camera-" + participantIdentity} className="rounded bg-gray-300">
        <video ref={videoElement} id={track.sid} className="rounded"></video>
        <p className="text-center text-gray-600 py-4">
          {participantIdentity + (local ? " (You)" : "")}
        </p>
      </div>
    </>
  );
}
