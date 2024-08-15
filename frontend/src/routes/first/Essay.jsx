import { useState, useEffect, useRef } from "react";
import FirstdNav from "./components/FirstNav";
import useFirstStore from "../../stores/FirstStore";
import useAuthStore from "../../stores/AuthStore";
import Ismajor from "./../../components/Ismajor";
import Button from "./../../components/Button";
import EssayCorrectionsCarousel from "./EssayCorrectionsCarousel";
import Swal from "sweetalert2";
import axios from "axios";
import {EssayApi} from './../../api/EssayApi'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoginAlert from "../../components/LoginAlert";
import { useNavigate } from "react-router-dom";

export default function Essay() {
  const selected = useFirstStore((state) => state.selected); // 전공자, 비전공자 유무
  const [essayId, setEssayId] = useState(1);
  const showCorrection = useFirstStore((state) => state.showCorrection); // AI 첨삭 버튼 클릭 유무
  const setShowCorrection = useFirstStore((state) => state.setShowCorrection);
  const essayContent = useFirstStore((state) => state.essayContent); // 에세이 작성 내용
  const setEssayContent = useFirstStore((state) => state.setEssayContent);
  const [essayReview, setEssayReview] = useState("");
  const [changedContent, setChangedContent] = useState("");
  const [totalFeedback, setTotalFeedback] = useState("");
  const [essayQuestion, setEssayQuestion] = useState(""); // 전공자/비전공자 질문 내용
  const isLogin = useAuthStore((state) => state.isLogin); // 로그인 유무

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const textareaRef = useRef(null);
  const overlayRef = useRef(null);

  const nav = useNavigate();
  const APIURL = "https://i11c201.p.ssafy.io:8443/api/v1/";

  const correctionRef = useRef(null); // AI 첨삭 내용의 높이를 참조하기 위한 ref
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  // AI 첨삭 요청 처리
  const handleAiCorrection = () => {

    <LoginAlert/>

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
    Swal.fire({
      title: "로딩 중...",
      text: "에세이 첨삭 중입니다.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // 에세이 저장 요청
    const Token = localStorage.getItem("Token");
    
    // 에세이 첨삭 요청
    axios
      .post(`${APIURL}essays/review`, beforeEssay, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        // 서버 응답 성공 시 리뷰 내용 설정
        const content = response.data.response.content;
        const parts = content.split("%%%");

        setEssayReview(parts[0].replace("newcontent:", "").trim());
        setChangedContent(parts[1].replace("changed:", "").trim());
        setTotalFeedback(parts[2].replace("totalfeedback:", "").trim());

        setShowCorrection(true); // 리뷰 내용을 성공적으로 받아온 경우에만 상태를 true로 설정
        Swal.close(); // 로딩 완료 후 알림창 닫기
      })
      .catch((error) => {
        console.log(error);
        setShowCorrection(false); // 에러 발생 시 상태를 false로 설정
        Swal.fire({
          title: "에러 발생",
          text: "에세이 첨삭 요청 중 에러가 발생했습니다.",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
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

    const Token = localStorage.getItem("Token");

    axios
      .put(`${APIURL}essays`, afterEssay, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        Swal.fire({
          title: "저장 완료",
          text: "에세이가 성공적으로 저장되었습니다.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    EssayApi.getEssay()
    .then((res)=>{
      if(res.content !== null) {
        setEssayContent(res.content)
      }
    })

  },[])

  useEffect(() => {
    const Token = localStorage.getItem("Token");
    
    axios
      .get(`${APIURL}essay-questions`, {
        params: {
          type: selected === "major" ? "MAJOR" : "NON_MAJOR", // 전공자/비전공자 타입
          generation: 11, // 기수
        },
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }, 
        
      )         
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

  const handleTextareaSelect = (e) => {
    setSelectionStart(e.target.selectionStart);
    setSelectionEnd(e.target.selectionEnd);
  };

  const getCurrentSentenceIndex = () => {
    const sentences = essayContent.split(/(?<=[.!?])\s+/);
    let charCount = 0;
    for (let i = 0; i < sentences.length; i++) {
      charCount += sentences[i].length + 1; // +1 for the space
      if (charCount > selectionStart) {
        return i;
      }
    }
    return sentences.length - 1;
  };

  useEffect(() => {
    if (textareaRef.current) {
      const index = getCurrentSentenceIndex();
      setHoveredIndex(index);
    }
  }, [selectionStart, selectionEnd, essayContent]);

  return (
    <>
      <FirstdNav />
      <div
        className={`container mx-auto p-5 max-w-7xl bg-white rounded-lg shadow-md mt-10 mb-20 transition-all duration-300 ease-in-out ${
          showCorrection ? "w-[950px] h-[950px]" : "w-[800px] h-[900px]"
        }`}
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 -4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex pb-10 items-center relative pt-4 ">
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
                  아이콘을 누르면 작성한 에세이에 대한 AI 첨삭 내용이
                  보여집니다.
                </p>
              </div>
              <div data-popper-arrow></div>
            </div>
          </div>
        </div>

        <div
          className={`flex ${showCorrection ? "flex-row space-x-4" : "flex-col"}`}
        >
          <div className="flex flex-col" style={{ width: "750px" }}>
            <div className="border border-gray-400 rounded-lg bg-white">
              <div className="py-5 flex flex-col items-center font-bold text-center">
                {showCorrection ? (
                  <p className="whitespace-pre-wrap px-4">
                    {essayQuestion} (500자 내외/ 최대 600자 까지)
                  </p>
                ) : (
                  essayQuestion.split(",").map((question, index, array) => (
                    <p key={index}>
                      {question}
                      {index === array.length - 1 &&
                        " (500자 내외/ 최대 600자 까지)"}
                    </p>
                  ))
                )}
              </div>
            </div>

            <div className="pt-6">
              <div className="flex flex-col">
                <textarea
                  ref={textareaRef}
                  className="block p-4 w-full resize-none text-sm text-gray-900 rounded-lg border border-gray-400 focus:border-black focus:outline-none focus:ring-0"
                  placeholder="여기에 작성해주세요."
                  spellCheck="false"
                  autoCorrect="off"
                  autoComplete="off"
                  style={{ lineHeight: 1.8, height: "38rem" }}
                  maxLength={600}
                  value={essayContent}
                  onChange={handleEssayContent}
                  onSelect={handleTextareaSelect}
                ></textarea>
              </div>
            </div>
          </div>

          {showCorrection && (
            <div className="flex flex-col gap-4">
              <div
                className="block p-4 w-[420px] text-sm text-gray-900 rounded-lg overflow-hidden"
                style={{
                  backgroundColor: "rgba(255, 192, 203, 0.2)",
                  height: "10rem",
                  wordWrap: "break-word",
                }}
              >
                <p className="font-bold text-lg mb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="rgba(255, 182, 193, 0.8)"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                  에세이 수정 내용
                </p>

                <EssayCorrectionsCarousel changedContent={changedContent} />
              </div>
              <div
                ref={correctionRef}
                className="block p-4 w-[420px] text-sm text-gray-900 rounded-lg"
                style={{
                  backgroundColor: "rgba(214, 237, 249, 1)",
                  lineHeight: 1.8,
                  height: "34rem",
                  wordWrap: "break-word",
                }}
              >
                <p className="font-bold text-lg pb-5 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="rgba(174, 207, 219, 1)"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
                    />
                  </svg>
                  에세이 첨삭 내용
                </p>

                {essayReview.split(/(?<=[.!?])\s+/).map((sentence, index) => (
                  <span key={index} className={hoveredIndex === index ? "bg-blue-200" : ""}>
                    {sentence}{" "}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {showCorrection && (
          <>
            <div className="flex gap-4">
              
              
            </div>
          </>
        )}

        <div className="flex">
          <Button text="저장" type="ESSAYSAVE" onClick={handleEssaySave} />
        </div>
      </div>
    </>
  );
}
