import { useRef, useEffect } from "react"
import * as faceapi from "face-api.js"

// face-api.js 로드 함수
// 참고 출처: 재광이형 샘플 프로젝트 https://github.com/JAEKWANG97/react-face-api

// const canvasRef = useRef()

const loadFaceAPIModels = async function () {
    const MODEL_URL = "/models"

    await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ])
}

// face-api.js: 비디오 재생이 시작될 때 호출되는 함수
const handleVideoPlay = async function (videoElement, canvasRef) {
    console.log(videoElement.current)
    const canvas = faceapi.createCanvasFromMedia(videoElement.current)
    canvasRef.current.appendChild(canvas)
    const displaySize = {
        width: videoElement.current.width,
        height: videoElement.current.height,
    }

    faceapi.matchDimensions(canvas, displaySize)

    // 주기적으로 얼굴을 감지하는 인터벌 설정
    setInterval(async () => {
        const detections = await faceapi
            .detectAllFaces(
                videoElement.current,
                new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceExpressions()

        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 100)
}

export { loadFaceAPIModels, handleVideoPlay }
