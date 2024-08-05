// InterviewTips.jsx
import { useState } from "react";
import quotationImg from "../../../../../public/main/quotation.png";

const tips = [
  {
    title: "잘하는 사람? No! 열정적인 사람 Yes!",
    points: [
      "싸피는 직장이 아닌 교육장임을 명심하세요! 면접관은 공부할 '학생'을 선발하는 거예요! ",
      "면접관에게 당신만의 공부 방법, 개발에 대한 관심과 열정 등을 마음껏 어필해보세요!",
    ],
  },
  {
    title: "싸피 생활은 생각보다 길어요!",
    points: [
      "1년 간의 교육 기간 동안 어떻게 성장해 갈 것인지 면접관에게 어필해보세요!",
      "본 교육과정은 팀 단위로 이루어져요. 본인의 팀에 대한 관점 및 팀워크 경험을 미리 정리해 두세요! ",
    ],
  },
  {
    title: "더듬어도 괜찮아요!",
    points: [
      "완벽하게 말할 필요 없어요! 면접관이 이해할 수 있을 정도로만 답변할 수 있으면 되요!",
      "조급함은 금물! 여유를 갖고 논리적으로 답변하려고 노력해보세요!",
    ],
  },
 
];

export default function InterviewTips() {
  const [currentPage, setCurrentPage] = useState(0);

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
      className="p-5 bg-white shadow-md rounded-xl ml-2 mr-2 mt-8 flex flex-col justify-between" // flex 레이아웃을 사용하여 상하단 고정
      style={{ height: "400px" }}
    >
      <div> {/* 상단 컨텐츠 */}
        <div className="flex items-center mb-4">
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
            <div className="mt-6" key={index}>
              <span className="text-blue-500">✔️</span>
              <span className="ml-2 px-1 text-gray-600">{point}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-4"> {/* 하단 컨텐츠, flex로 배치 */}
        <span
          className={`cursor-pointer ${
            currentPage === 0 ? "text-gray-300 cursor-not-allowed" : "text-blue-500"
          }`}
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          ← Prev
        </span>
        <span
          className={`cursor-pointer ${
            currentPage === tips.length - 1 ? "text-gray-300 cursor-not-allowed" : "text-blue-500"
          }`}
          onClick={handleNextPage}
          disabled={currentPage === tips.length - 1}
        >
          Next →
        </span>
      </div>
    </div>
  );
}
