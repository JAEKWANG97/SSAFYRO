import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "./../../../components/Button";

// import axios
import axios from "axios";

// import store
import useInterviewStore from "../../../stores/InterviewStore";

export default function PTReady() {
  const navigate = useNavigate();
  const { roomid } = useParams();

  async function leaveRoom() {
    const token = localStorage.getItem("Token")
    try {
      await axios.post(
        `http://i11c201.p.ssafy.io:9999/api/v1/rooms/exit`,
        {
          roomId: roomid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log("Successfully left the room")
    } catch (error) {
      console.error("Error leaving the room: ", error)
    }
  }

  // 면접 종료 버튼 클릭 시
  const handleEndInterview = async () => {
    const result = await Swal.fire({
      title: "정말 면접을 종료하시겠습니까?",
      text: "면접 피드백 제공이 불가능합니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "종료",
      cancelButtonText: "취소",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      await leaveRoom(); 
      Swal.fire("면접 종료", "면접이 종료되었습니다.", "success");
      navigate("/second/interview");
    } else if (result.isDismissed) {
      Swal.fire("취소", "면접이 계속 진행됩니다.", "info");
    }
  };

  // 면접 시작 버튼 클릭 시
  const handleStartInterview = () => {
    navigate(`/second/interview/room/${roomid}/pt`);
  };

  const Timer = () => {
    const [seconds, setSeconds] = useState(900); // 15분 = 900초
    const timerRef = useRef();

    useEffect(() => {
      timerRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timerRef.current); // 컴포넌트 언마운트 시 타이머를 클리어
    }, []);

    useEffect(() => {
      if (seconds <= 0) {
        clearInterval(timerRef.current); // 시간이 0이 되면 타이머를 멈춤
        handleStartInterview(); // 시간이 다 되면 면접 시작
      }
    }, [seconds]);

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`;
    };

    return <div className="text-4xl font-bold">⏱ {formatTime(seconds)}</div>;
  };

  // 테스트용 더미 데이터

  const initData = {
    title: "로딩 중입니다...",
    content: "현재 질문 정보를 불러오는 중입니다. 잠시만 기다려주세요.",
    question: ["", ""],
  };

  const dummyData = {
    title: "다시 시도해주세요. (ERROR)",
    content:
      "현재 질문 정보를 불러오는 데 어려움이 있는 것 같습니다. 다시 시도하거나 조금 더 기다려주세요.",
    question: [
      "",
      "",
    ],
  };

  // axios 데이터 요청
  const [interviewQuestion, setInerviewQuestion] = useState(initData);
  const setPTQuestions = (questions) => useInterviewStore.setState({ PTQuestions: questions });

  const APIURL = "http://i11c201.p.ssafy.io:9999/api/v1/";

  const getQuestion = function () {
    axios
      .get(APIURL + `interview/pt/${roomid}`, {
        timeout: 300000
      })
      .then((response) => {
        setInerviewQuestion(response.data.response);
        setPTQuestions(response.data.response.question);
      })
      .catch((error) => {
        console.log(error);
        setInerviewQuestion(dummyData);
      });
  }

  let getQuestionTrigger = 1;
  useEffect(() => {
    if (getQuestionTrigger) {
      getQuestionTrigger = 0;
      getQuestion();
    }
  }, [getQuestionTrigger]);

  // axios 데이터 요청 끝

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl relative">
        <div className="relative mb-6" style={{ height: "60px" }}>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Timer />
          </div>
          <div className="absolute right-0">
            <Button
              text="면접 종료"
              type="INTERVIEWCLOSE"
              onClick={handleEndInterview}
            />
          </div>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-4">{interviewQuestion.title}</h3>
          <p className="mb-4">{interviewQuestion.question[0]}</p>
          {interviewQuestion.question.length > 1 && 
            <p className="mb-4">{interviewQuestion.question[1]}</p>}
          <p className="mb-2">{interviewQuestion.content}</p>
        </div>
        <div className="flex">
          <Button
            text="면접 시작"
            type="INTERVIEWSTART"
            onClick={handleStartInterview}
            className="ml-auto"
          />
        </div>
      </div>
    </div>
  );
}
