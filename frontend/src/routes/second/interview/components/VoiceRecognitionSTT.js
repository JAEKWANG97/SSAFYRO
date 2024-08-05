import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import 'regenerator-runtime/runtime';

// STT 기능을 사용하기 위한 Hook입니다.
const useSpeechToText = function () {
  const { transcript, listening } = useSpeechRecognition();

  const restartListening = function () {
    if (listening) {
      SpeechRecognition.stopListening();
      SpeechRecognition.startListening({ language: "ko-KR", continuous: false });
    } else {
      SpeechRecognition.startListening({ language: "ko-KR", continuous: false });
    }
  }

  return { transcript, listening, restartListening };
};

export default useSpeechToText;