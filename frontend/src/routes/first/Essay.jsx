import { useState, useEffect } from "react";
import FirstdNav from "./components/FirstNav";
import useFirstStore from "../../stores/FirstStore";
import useAuthStore from "../../stores/AuthStore";
import Ismajor from "./../../components/Ismajor";
import Button from "./../../components/Button";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Essay() {
  const selected = useFirstStore((state) => state.selected); // 전공자, 비전공자 유무
  const [essayId, setEssayId] = useState(1);
  const showCorrection = useFirstStore((state) => state.showCorrection); // AI 첨삭 버튼 클릭 유무
  const setShowCorrection = useFirstStore((state) => state.setShowCorrection);
  const essayContent = useFirstStore((state) => state.essayContent); // 에세이 작성 내용
  const setEssayContent = useFirstStore((state) => state.setEssayContent);
  const [essayReview, setEssayReview] = useState("");
  const [essayQuestion, setEssayQuestion] = useState(""); // 전공자/비전공자 질문 내용
  const isLogin = useAuthStore((state) => state.isLogin); // 로그인 유무

  const nav = useNavigate();
  const APIURL = "http://i11c201.p.ssafy.io:9999/api/v1/";

  const [isLoading, setIsLoading] = useState(false); // Loading state for spinner

  // AI 첨삭 요청 처리
  const handleAiCorrection = () => {
    // 로그인 확인
    // if (!isLogin) {
    //   Swal.fire({
    //     title: "로그인을 해주세요",
    //     text: "로그인이 필요한 기능입니다.",
    //     icon: "warning",
    //     confirmButtonColor: "#3085d6",
    //     confirmButtonText: "확인",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       nav("/account/login");
    //     }
    //   });
    //   return;
    // }

    // 에세이 내용이 없는 경우 경고 메시지 표시
    if (!essayContent || essayContent.trim() === "") {
      setShowCorrection(false);

      Swal.fire({
        title: "에세이를 입력해주세요",
        text: "AI 첨삭을 받으려면 에세이를 작성해야 합니다.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });

      return;
    }

    const beforeEssay = {
      essayQuestionId: essayId,
      content: essayContent,
    };

    // Start loading spinner
    setIsLoading(true);

    // 에세이 첨삭 요청
    axios
      .post(`${APIURL}essays/review`, beforeEssay)
      .then((response) => {
        // 서버 응답 성공 시 리뷰 내용 설정
        setEssayReview(response.data.response.content);
        setShowCorrection(true); // 리뷰 내용을 성공적으로 받아온 경우에만 상태를 true로 설정
      })
      .catch((error) => {
        console.log(error);
        setShowCorrection(false); // 에러 발생 시 상태를 false로 설정
      })
      .finally(() => {
        // Stop loading spinner
        setIsLoading(false);
      });
  };

  // 에세이 내용 업데이트 처리
  const handleEssayContent = (e) => {
    setEssayContent(e.target.value);
  };

  // 에세이 저장 요청 처리
  const handleEssaySave = () => {
    if (!isLogin) {
      Swal.fire({
        title: "로그인을 해주세요",
        text: "로그인이 필요한 기능입니다.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          nav("/account/login");
        }
      });
      return;
    }

    const afterEssay = {
      essayQuestionId: essayId,
      content: essayContent,
    };

    // 에세이 저장 요청
    const Token = localStorage.getItem("Token");

    axios
      .post(`${APIURL}essays`, afterEssay, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`${APIURL}essay-questions`, {
        params: {
          type: selected === "major" ? "MAJOR" : "NON_MAJOR", // 전공자/비전공자 타입
          generation: 11, // 기수
        },
      })
      .then((res) => {
        setEssayId(res.data.response.id); // 에세이 질문 id
        setEssayQuestion(res.data.response.content); // 에세이 질문 content
      })
      .catch((error) => {
        console.log(error);
      });

    const infoIcon = document.getElementById("info-icon");
    const popoverDescription = document.getElementById("popover-description");

    if (infoIcon && popoverDescription) {
      // 마우스를 아이콘 위에 올렸을 때
      infoIcon.addEventListener("mouseenter", () => {
        popoverDescription.classList.remove("invisible", "opacity-0");
        popoverDescription.classList.add("opacity-100");
      });

      // 마우스를 아이콘에서 내렸을 때
      infoIcon.addEventListener("mouseleave", () => {
        popoverDescription.classList.add("invisible", "opacity-0");
        popoverDescription.classList.remove("opacity-100");
      });
    }

    return () => {
      if (infoIcon && popoverDescription) {
        infoIcon.removeEventListener("mouseenter", () => {
          popoverDescription.classList.remove("invisible", "opacity-0");
          popoverDescription.classList.add("opacity-100");
        });

        infoIcon.removeEventListener("mouseleave", () => {
          popoverDescription.classList.add("invisible", "opacity-0");
          popoverDescription.classList.remove("opacity-100");
        });
      }
    };
  }, [selected]); // selected 변경 시 API 요청 실행

  return (
    <>
      <FirstdNav />
      <div
        className={`container mx-auto p-5 bg-white rounded-lg shadow-md mt-10 mb-20 ${
          showCorrection ? "max-w-6xl" : "max-w-4xl"
        }`}
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 -4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex pb-10 items-center relative pt-4">
          <p className="text-2xl font-extrabold pr-4 pl-2">에세이</p>
          <Ismajor />

          <div className="ml-auto relative">
            <svg
              id="info-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 48 48"
              className="text-gray-400 hover:text-gray-500 cursor-pointer"
              onClick={handleAiCorrection}
            >
              <g fill="none">
                <rect
                  width={30}
                  height={24}
                  x={9}
                  y={18}
                  stroke="currentColor"
                  strokeWidth={4}
                  rx={2}
                ></rect>
                <circle cx={17} cy={26} r={2} fill="currentColor"></circle>
                <circle cx={31} cy={26} r={2} fill="currentColor"></circle>
                <path
                  fill="currentColor"
                  d="M20 32a2 2 0 1 0 0 4zm8 4a2 2 0 1 0 0-4zm-8 0h8v-4h-8z"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={4}
                  d="M24 10v8M4 26v8m40-8v8"
                ></path>
                <circle
                  cx={24}
                  cy={8}
                  r={2}
                  stroke="currentColor"
                  strokeWidth={4}
                ></circle>
              </g>
            </svg>

            <div
              id="popover-description"
              className="absolute left-0 right-auto mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm text-gray-500 z-10 invisible opacity-0 transition-opacity duration-300"
            >
              <div className="p-3 space-y-2">
                <p className="font-semibold text-gray-900">
                  아이콘을 누르면 작성한 에세이에 대한 AI 첨삭 내용이 보여집니다.
                </p>
              </div>
              <div data-popper-arrow></div>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1 border border-gray-400 rounded-lg bg-white p-4 mb-6">
            {selected === "major" && (
              <div className="flex flex-col items-center font-bold text-center mb-4">
                {essayQuestion.split(",").map((question, index, array) => (
                  <p key={index}>
                    {question}
                    {index === array.length - 1 && " (500자 내외/ 최대 600자 까지)"}
                  </p>
                ))}
              </div>
            )}

            {selected === "nonMajor" && (
              <div className="flex flex-col items-center font-bold text-center mb-4">
                {essayQuestion.split(",").map((question, index, array) => (
                  <p key={index}>
                    {question}
                    {index === array.length - 1 && " (500자 내외/ 최대 600자 까지)"}
                  </p>
                ))}
              </div>
            )}

            <div className="pt-6">
              {isLoading && (
                <div className="flex justify-center items-center mb-4">
                  <svg
                    className="animate-spin h-5 w-5 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 4.063 2.179 7.634 5.29 9.453l.71-1.162z"
                    ></path>
                  </svg>
                  <p className="ml-2">Loading...</p>
                </div>
              )}

              <textarea
                className="block p-4 w-full h-64 resize-none text-sm text-gray-900 rounded-lg border border-gray-400 focus:ring-[#90CCF0] focus:border-[#90CCF0]"
                placeholder="여기에 작성해주세요."
                spellCheck="false"
                autoCorrect="off"
                autoComplete="off"
                maxLength={600}
                value={essayContent}
                onChange={handleEssayContent}
              ></textarea>
            </div>
          </div>

          {showCorrection && (
            <div className="flex-1 border border-gray-400 rounded-lg bg-white p-4">
              <div className="text-sm text-gray-900">
                {essayReview}
              </div>
            </div>
          )}
        </div>
        <div className="flex mt-4">
          <Button text="저장" type="ESSAYSAVE" onClick={handleEssaySave} />
        </div>
      </div>
    </>
  );
}
