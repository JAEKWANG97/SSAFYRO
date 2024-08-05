import { useRef, useState, useEffect } from 'react';

const recognitionRef = useRef(null);
const [transcript, setTranscript] = useState('');
const [isListening, setIsListening] = useState(false);

useEffect(() => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'ko-KR';

    recognitionRef.current.onresult = (event) => {
      const current = event.resultIndex;
      console.log(event.results[current])
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
}, []);

export { transcript, isListening, setIsListening };