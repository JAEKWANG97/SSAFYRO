import { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";

const useSpeechToText = function () {
    const [transcript, setTranscript] = useState("");
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
            setTranscript(result);
        },
    });

    const restart = function () {
        stop();
        listen({ lang: "ko-KR" });
    }

    return { transcript, listening, listen, stop, restart };
};

export default useSpeechToText;