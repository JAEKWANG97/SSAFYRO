import { useState } from "react";
import quotationImg from "../../../../../public/main/quotation.png";
import checkIcon from "../../../../../public/main/check.png";

const tipsData = {
  PRESENTATION: [
    {
      title: "PT 면접, 어떻게 진행되나요?",
      points: [
        "면접 시작 버튼을 누르면, 15분동안 PT면접 주제와 문제가 주어질 거예요!",
        "문제의 논점과 해결책을 모색, 정리하여 면접에 대비하세요! 노트 등에 필기해도 OK!",
        "제한시간이 지나면 자동으로 면접장으로 이동해요! 30초 전에는 준비를 마쳐두세요!",
      ],
    },
    {
      title: "면접 진행 흐름을 알려주세요!",
      points: [
        "면접이 시작되면 참여자 중 1명이 면접자가 되고, 나머지는 면접관의 역할을 수행하게 되요! ",
        "면접자는 10분 동안 질문을 받게 되고, 10분이 지나면 다른 참여자에게 면접자 역할이 넘어가요!",
        "모든 참여자가 한번씩 면접자 역할을 수행하고 나면 면접이 종료되요!",
      ],
    },
    {
      title: "면접관 역할, 어떻게 수행해야 하나요?",
      points: [
        "면접관은 한 사람씩 돌아가며 질문을 하게 될거예요! ",
        "어떻게 질문해야 할지 모르겠나요? 걱정 마세요! ai가 추천 질문을 뽑아줄 거예요!",
      ],
    },
    {
      title: "주의사항",
      points: [
        "참여자는 발언이 끝나면, 초록색 버튼을 꼭 눌러주세요! 면접 후, ai가 여러분의 면접 결과를 분석해 줄거예요!",
        "한 면접자의 면접 순서가 끝나면 2분의 시간이 주어져요! 면접관은 설문 버튼을 눌러 면접자를 평가해 주세요!",
        "오른쪽 이모티콘을 통해 현재 자신의 표정을 확인할 수 있어요! 이를 유념하여 면접에 임해보세요!",
      ],
    },
  ],
  PERSONALITY: [
    {
      title: "면접 진행 흐름을 알려주세요!",
      points: [
        "면접이 시작되면 참여자 중 1명이 면접자가 되고, 나머지는 면접관의 역할을 수행하게 되요! ",
        "면접자는 10분 동안 질문을 받게 되고, 10분이 지나면 다른 참여자에게 면접자 역할이 넘어가요!",
        "모든 참여자가 한번씩 면접자 역할을 수행하고 나면 면접이 종료되요!",
      ],
    },
    {
      title: "면접관 역할, 어떻게 수행해야 하나요?",
      points: [
        "면접관은 한 사람씩 돌아가며 질문을 하게 될거예요! ",
        "어떻게 질문해야 할지 모르겠나요? 걱정 마세요! ai가 추천 질문을 뽑아줄 거예요!",
      ],
    },
    {
      title: "주의사항",
      points: [
        "참여자는 발언이 끝나면, 초록색 버튼을 꼭 눌러주세요! 면접 후, ai가 여러분의 면접 결과를 분석해 줄거예요!",
        "한 면접자의 면접 순서가 끝나면 2분의 시간이 주어져요! 면접관은 설문 버튼을 눌러 면접자를 평가해 주세요!",
        "오른쪽 이모티콘을 통해 현재 자신의 표정을 확인할 수 있어요! 이를 유념하여 면접에 임해보세요!",
      ],
    },
  ],
};

export default function InterviewTips({ interviewType }) {
  const [currentPage, setCurrentPage] = useState(0);
  const tips = tipsData[interviewType] || [];

  const handleNextPage = () => {
    if (currentPage < tips.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div
      className="p-5 bg-white shadow-md rounded-xl ml-2 mr-2 mt-1 mb-2 flex flex-col justify-between"
      style={{ height: "50%", maxHeight: "380px" }}
    >
      <div
        className="custom-scrollbar"
        style={{
          overflowY: "auto",
          flexGrow: 1,
          height: "100%",
        }}
      >
        {/* 상단 컨텐츠 */}
        <div className="flex items-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.0em"
            height="2.0em"
            viewBox="0 0 48 48"
            className="text-blue-500"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.005 43.5h12.188m-19.5-28.667C12.429 8.353 17.39 4.5 24.099 4.5s11.67 3.852 13.406 10.333s-1.502 13.125-7.312 16.48v7.312H18.005v-7.312c-7.65-3.654-9.049-10-7.312-16.48"
            ></path>
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.28 18.296s-.786-8.599 9.888-9.982"
            ></path>
          </svg>
          <h2 className="flex-grow text-2xl font-bold mt-2 ml-2">면접 Tip</h2>
        </div>
        <div className="mt-4 px-2">
          <div className="flex justify-center">
            <img
              src={quotationImg}
              alt="quotationImg"
              style={{ width: "23px", height: "18px" }}
            />
          </div>
          <h1 className="mt-3 mb-8 text-xl font-semibold text-center text-gray-600 italic">
            {tips[currentPage].title}
          </h1>
          {tips[currentPage].points.map((point, index) => (
            <div className="mt-6 flex items-start" key={index}>
              <span>
                <img
                  src={checkIcon}
                  alt="checkIcon"
                  className="w-5 h-5 mt-1 mr-2"
                />
              </span>
              <span className="px-1 text-gray-600">{point}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <span
          className={`cursor-pointer ${
            currentPage === 0
              ? "text-gray-300 cursor-not-allowed"
              : "text-blue-500"
          }`}
          onClick={handlePrevPage}
        >
          ← Prev
        </span>
        <span
          className={`cursor-pointer ${
            currentPage === tips.length - 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-blue-500"
          }`}
          onClick={handleNextPage}
        >
          Next →
        </span>
      </div>
      <style>
        {`
        .custom-scrollbar::-webkit-scrollbar {
          width: 15px; /* 스크롤바의 너비 */
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          height: 10%; /* 스크롤바의 길이 */
          background: #A9A9A9; /* 스크롤바의 색상: 회색으로 변경 */
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(128, 128, 128, 0.1); /* 스크롤바 뒷 배경 색상: 연한 회색 */
        }
        `}
      </style>
    </div>
  );
}
