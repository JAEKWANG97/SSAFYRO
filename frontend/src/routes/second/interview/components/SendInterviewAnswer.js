import axios from 'axios';

// 면접 답변 양식 생성
const createInterviewAnswer = function (userId, question, answer, faceExpression) {
    let interviewAnswer = {
        userId: userId,
        question: question,
        answer: answer,
        pronunciationScore: 3,
        happy: faceExpression.happy,
        disgust: faceExpression.disgust,
        sad: faceExpression.sad,
        surprise: faceExpression.surprise,
        fear: faceExpression.fear,
        angry: faceExpression.angry,
        neutral: faceExpression.neutral,
    }

    return interviewAnswer;
}

const handleSubmitAnswer = async function (interviewAnswer) {
    await axios.post("https://i11c201.p.ssafy.io:8443/api/v1/interview/question-answer-result", interviewAnswer)
    .then((response) => {
        // 제출 성공
        // console.log(response.data.response);
    })
    .catch((error) => {
        // 제출 실패
        console.error(error);
        console.log("답변 제출 실패");
    })
}

export { createInterviewAnswer, handleSubmitAnswer };