// import axios
import axios from "axios";

// 1. URL로 현재 면접 방의 roomId를 취득
// 2. 해당 roomId의 상세 방 정보를 API 통하여 불러오기
// 3. 받아온 상세 방 정보에서 유저 리스트 userList와 유저의 수 capacity를 취득
// 4. userList의 순서대로 면접 순서를 지정
// 5. 타이머를 지정하고, 해당 시간(10분)이 지나면 순서를 끝냄
// 6. 순서가 끝나면 다음 순서로 넘어가기 전의 대기 시간 2분을 추가 부여
// 7. 추가 시간 2분 동안, 현재 면접자 역할을 맡은 유저의 면접 평가 기능을 면접관 역할을 하는 유저에게 활성화
// 8. 평가 완료시, 다음 평가 전까지 면접 평가 기능을 비활성화
// 9. 전체 면접이 끝날 때 까지(turnCount가 capacity와 같아지기 전까지) 5 - 8을 반복

// 4. 만약 면접자가 1명이라면, PT.jsx에 1명임을 알림
// 5. 그리고 시간이 종료되면 자동으로 평가를 종료함

// 10. 면접이 종료되면 면접이 종료되었음을 알리고 마이페이지로 이동시키기

let roomId = location.pathname.substring("/second/interview/room/".length, location.pathname.length)
const APIURL = `http://i11c201.p.ssafy.io:9999/api/v1/rooms/${roomId}`;

let turnChange = new WebSocket(`wss://i11c201.p.ssafy.io:8443/interview/turn/${roomId}`);

turnChange.send(JSON.stringify({
    nowStage: "FIRST" // FIRST, SECOND, THIRD 중에서 값 하나
}))

