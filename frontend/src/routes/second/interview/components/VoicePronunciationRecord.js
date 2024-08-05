import axios from "axios"

// 발음 정확도 평가 API 전송을 위한 음성 녹음 전처리
const caputerConstraint = { audio: true, video: false }
let recorder
let audioChunks = []

// get user permission for record audio
navigator.mediaDevices
    .getUserMedia(caputerConstraint)
    .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream)

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data)
        }
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: "audio/wav" })
            const reader = new FileReader()

            reader.onload = () => {
                const base64String = reader.result.split(",")[1]
                console.log(base64String)
            }

            reader.readAsDataURL(audioBlob)
        }

        mediaRecorder.start()

        setTimeout(() => {
            mediaRecorder.stop()
        }, 55000) // 55초가 지나면 멈추도록 설계해놓았는데, 그 이전에 전송 버튼을 누르면 수동으로 정지할 수 있도록 변경이 필요할 것으로 보임
    })
    .catch((error) => {
        console.error(error)
    })

// 공공 인공지능 API Key 가져오기
const API_KEY = import.meta.env.VITE_ETRI_API_KEY

// 발음 정확도 평가 API 전송-수신
const pronunciationEvaluation = async function (base64String) {
    await axios
        .post(
            "http://aiopen.etri.re.kr:8000/WiseASR/Pronunciation",
            {
                argument: {
                    language_code: "korean",
                    audio: base64String,
                },
            },
            {
                headers: { Authorization: API_KEY },
            }
        )
        .then((response) => {
            console.log(response.data.return_object.score)
        })
        .catch((error) => {
            console.error(error)
        })
}
