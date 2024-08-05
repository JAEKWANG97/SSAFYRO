import { useRef, useEffect } from "react"
import * as faceapi from "face-api.js"

// 가장 확실한 감정을 찾는 함수
const getExpression = function (obj) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (!acc || value > acc[1]) {
            acc = [key, value]
        }
        return acc
    }, null)[0]
}

// face-api.js 로드 함수
// 참고 출처: 재광이형 샘플 프로젝트 https://github.com/JAEKWANG97/react-face-api

// const canvasRef = useRef()
let faceExpression = "netural"

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
const handleVideoPlay = async function (
    videoElement,
    canvasRef,
    setFaceExpression
) {
    const canvas = faceapi.createCanvasFromMedia(videoElement.current)
    canvasRef.current.appendChild(canvas)
    const displaySize = {
        width: videoElement.current.width,
        height: videoElement.current.height,
    }

    faceapi.matchDimensions(canvas, displaySize)

    // 주기적으로 얼굴을 감지하는 인터벌 설정
    let errorCount = 0
    const detectFace = async function () {
        try {
            const detections = await faceapi
                .detectAllFaces(
                    videoElement.current,
                    new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceLandmarks()
                .withFaceExpressions()

            const resizedDetections = faceapi.resizeResults(
                detections,
                displaySize
            )

            // 출력될 사용자 표정 지정
            // console.log(getExpression(resizedDetections[0].expressions))
            setFaceExpression(getExpression(resizedDetections[0].expressions))

            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height)
            faceapi.draw.drawDetections(canvas, resizedDetections)
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

        } catch (error) {
            console.error(error)
            console.log("오류 발생으로 표정 인식이 중지됩니다.")
            errorCount++
        }
    }

    setInterval(detectFace, 100)

    if (errorCount > 1000) {
        console.log("표정 인식이 너무 많이 실패하여 중지합니다.")
        clearInterval(detectFace)
    }
}

export { loadFaceAPIModels, handleVideoPlay }
