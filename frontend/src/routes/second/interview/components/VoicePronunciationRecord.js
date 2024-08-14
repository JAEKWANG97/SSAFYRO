import axios from "axios";

// 발음 정확도 평가 API 전송을 위한 음성 녹음 전처리
const caputerConstraint = { audio: true, video: false };
// let recorder;
let mediaRecorder;
let audioChunks = [];
let base64String;

// 공공 인공지능 API Key 가져오기
const API_KEY = "369fa137-5c63-436e-aa45-1c6f29bc3bc5";

// 발음 정확도 평가 API 전송-수신
let pronunciationScore
const pronunciationEvaluation = async function (base64String) {
    await axios
      .post(
        "https://i11c201.p.ssafy.io:8443/WiseASR/Pronunciation",
        {
          argument: {
            language_code: "korean",
            audio: (String(base64String)),
          },
        },
        {
          headers: { Authorization: API_KEY },
        }
      )
      .then((response) => {
        // console.log("발음 평가 점수: ", response.data.return_object.score);
        pronunciationScore = response.data.return_object.score;
        return response.data.return_object.score;
      })
      .catch((error) => {
        console.log("발음 정확도 평가 에러 발생!!")
        console.error(error);
      });
  };

const startRecording = () => {
    console.log("녹화 시작")
  // get user permission for record audio
  navigator.mediaDevices
    .getUserMedia(caputerConstraint)
    .then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = []; // 녹음을 시작할 때 audioChunks

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const reader = new FileReader();

        reader.onload = async () => {
          base64String = reader.result.split(",")[1];
          // console.log(base64String);
          await pronunciationEvaluation(base64String);
          console.log("발음 평가 점수: ", pronunciationScore);
        };

        reader.readAsDataURL(audioBlob);
      };

      mediaRecorder.start();

      setTimeout(() => {
        if (mediaRecorder.state !== "inactive") {
          mediaRecorder.stop();
        }
      }, 55000); // 55초가 지나면 멈추도록 설계해놓았는데, 그 이전에 전송 버튼을 누르면 수동으로 정지할 수 있도록 변경이 필요할 것으로 보임
    })
    .catch((error) => {
      console.error(error);
    });
};

// 녹음을 수동으로 중지하는 함수
const stopRecording = () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    console.log("녹화 종료")
    mediaRecorder.stop();
  }
};

export { pronunciationEvaluation, base64String, startRecording, stopRecording, pronunciationScore };
