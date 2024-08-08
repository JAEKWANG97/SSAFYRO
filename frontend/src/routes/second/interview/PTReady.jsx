import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "./../../../components/Button";

// import axios
import axios from "axios";

export default function PTReady() {
  const navigate = useNavigate();
  const { roomid } = useParams();

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
    title: "Test Title",
    content: "Test Content",
    question: ["Question 1", "Question 2"],
  };

  const dummyData = {
    title: "2024 미국 대선과 AI 기술 주도의 미래",
    content:
      "트럼프가 총에 맞았지만 엄청난 운으로 살아남았다. 투명 트럼프가 울부짖었다. 크아아아앙. 투명 트럼프는 존나 강해서 미국 대통령 선거를 씹어먹었다. \n 투명 트럼프가 가져오는 미국 중심 외교 정책은 우크라이나 전쟁을 비롯한 국제 정세 양상에 어떤 영향을 끼치는가? 이것은 2022년 들어서 급성장하기 시작한 인공지능(AI) 발전과도 관계를 맺을 수 있어보인다. AI로 매우 효율적인 작업이 가능해지면서 군사 분야에서도 고도의 발전을 기대하게 한다.",
    question: [
      "다음 기사를 읽고 현재 불편 사항을 개선할 수 있는 서비스를 제안하시오.",
      "AI 기술이 발전함에 따라 군사 분야에서 어떤 변화가 있을 것이라고 생각하시나요?",
    ],
  };

  // axios 데이터 요청
  const [interviewQuestion, setInerviewQuestion] = useState(initData);

  const APIURL = "http://i11c201.p.ssafy.io:8080/api/v1/";

  axios
    .get(APIURL + `interview/pt/${roomid}`)
    .then((response) => {
      setInerviewQuestion(response.data.response);
    })
    .catch((error) => {
      console.log(error);
      setInerviewQuestion(dummyData);
    });

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
