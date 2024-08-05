import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

// STT 기능을 사용하기 위한 Hook입니다.
const useSpeechToText = function () {
  const { transcript, listening } = useSpeechRecognition();

  const toggleListening = function () {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ language: "ko-KR", continuous: false });
    }
  }

  return { transcript, listening, toggleListening };
};

export default useSpeechToText;