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
      <div id={"camera-" + participantIdentity}>
        <div>
          <p>{participantIdentity + (local ? " (You)" : "")}</p>
        </div>
        <video ref={videoElement} id={track.sid}></video>
      </div>
    </>
  );
}
