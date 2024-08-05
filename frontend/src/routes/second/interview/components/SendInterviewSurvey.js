// 면접 평가표를 전송하는 함수
import axios from 'axios';

const createInterviewSurvey = function (roomId, userId, score) {
    let interviewSurvey = {
        roomId: roomId,
        userId: userId,
        score: score,
    }

    return interviewSurvey;
};

const handleSubmitSurvey = async function (interviewSurvey) {
    await axios.post("http://i11c201.p.ssafy.io:9999/api/v1/interview/score", interviewSurvey)
    .then((response) => {
        // 응답 성공시
        alert("평가표가 제출되었습니다.")
    })
    .catch((error) => {
        // 응답 실패시
        console.error(error);
        alert("평가표 제출에 실패했습니다.")
    })
};

export { createInterviewSurvey, handleSubmitSurvey };