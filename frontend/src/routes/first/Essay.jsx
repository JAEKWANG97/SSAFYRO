import { useEffect } from 'react';
import FirstdNav from './components/FirstNav';
import useFirstStore from '../../stores/FirstStore';
import Ismajor from './../../components/Ismajor';
import Button from './../../components/Button';
import Swal from 'sweetalert2';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Essay() {
  const selected = useFirstStore((state) => state.selected); // 전공자, 비전공자 유무
  const essayId = selected === 'major'? 1:2 
  const showCorrection = useFirstStore((state) => state.showCorrection); // AI 첨삭 버튼 클릭 유무
  const setShowCorrection = useFirstStore((state) => state.setShowCorrection);
  const essayContent = useFirstStore((state) => state.essayContent); // 에세이 작성 내용
  const setEssayContent = useFirstStore((state) => state.setEssayContent);
  const isLogin = useFirstStore((state) => state.isLogin); // 로그인 유무

  const nav = useNavigate()

  const handleAiCorrection = () => {
    
    if (!isLogin) {
      Swal.fire({
        title: '로그인을 해주세요',
        text: '로그인이 필요한 기능입니다.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: '확인',
      }).then((result) => {
        if (result.isConfirmed) {
          nav('/account/login');
        }
      });
      return;
    }
    
    if (!essayContent || essayContent.trim() === '') {
      setShowCorrection(false);
  
      // 경고 메시지 표시
      Swal.fire({
        title: '에세이를 입력해주세요',
        text: 'AI 첨삭을 받으려면 에세이를 작성해야 합니다.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: '확인',
      });
  
      return; 
    }
  
    // 에세이 내용이 있는 경우 첨삭 시작
    setShowCorrection(true);
  
    const beforeEssay = {
      essayQuestionId: essayId,
      content: essayContent,
    };
  
    // API 요청
    axios
      .post('http://i11c201.p.ssafy.io:9999/api/v1/essays/review', beforeEssay)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const handleEssayContent = (e) => {
    setEssayContent(e.target.value);
  };

  const handleEssaySave = () => {
  
    if (!isLogin) {
      Swal.fire({
        title: '로그인을 해주세요',
        text: '로그인이 필요한 기능입니다.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: '확인',
      }).then((result) => {
        if (result.isConfirmed) {
          nav('/account/login');
        }
      });
      return; 
    }
  
    const afterEssay = {
      userId : 1, // 임시 유저 정보
      essayQuestionId : essayId,
      content : essayContent
    }

    axios
    .post("http://i11c201.p.ssafy.io:9999/api/v1/essays", afterEssay)

  }

  // useEffect를 사용하여 컴포넌트 마운트 시 DOM 이벤트를 설정
  useEffect(() => {
    const infoIcon = document.getElementById('info-icon');
    const popoverDescription = document.getElementById('popover-description');

    if (infoIcon && popoverDescription) {
      // 마우스를 아이콘 위에 올렸을 때
      infoIcon.addEventListener('mouseenter', () => {
        popoverDescription.classList.remove('invisible', 'opacity-0');
        popoverDescription.classList.add('opacity-100');
      });

      // 마우스를 아이콘에서 내렸을 때
      infoIcon.addEventListener('mouseleave', () => {
        popoverDescription.classList.add('invisible', 'opacity-0');
        popoverDescription.classList.remove('opacity-100');
      });
    }

    return () => {
      if (infoIcon && popoverDescription) {
        infoIcon.removeEventListener('mouseenter', () => {
          popoverDescription.classList.remove('invisible', 'opacity-0');
          popoverDescription.classList.add('opacity-100');
        });

        infoIcon.removeEventListener('mouseleave', () => {
          popoverDescription.classList.add('invisible', 'opacity-0');
          popoverDescription.classList.remove('opacity-100');
        });
      }
    };
  }, []); // 빈 배열을 사용하여 컴포넌트 마운트 시 한 번만 실행

  return (
    <>
      <FirstdNav />
      <div
        className="container mx-auto p-5 max-w-4xl bg-white rounded-lg shadow-md mt-10 mb-20"
        style={{
          boxShadow:
            '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
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
                  아이콘을 누르면 작성한 에세이에 대한 AI 첨삭 내용이 보여집니다.
                </p>
              </div>
              <div data-popper-arrow></div>
            </div>
          </div>
        </div>

        <div className="border border-gray-400 rounded-lg bg-white">
          {selected === 'major' && (
            <div className="py-5 flex flex-col items-center font-bold text-center">
              <p>
                향후 어떤 SW 개발자로 성장하고 싶은지 SW 관련 경험을 토대로
                기술하고,
              </p>
              <p>
                SSAFY에 지원하신 동기에 대해서도 작성 바랍니다. (500자 내외/ 최대
                600자 까지)
              </p>
            </div>
          )}

          {selected === 'nonMajor' && (
            <div className="py-5 flex flex-col items-center font-bold text-center">
              <p>
                학업 및 취업준비를 하며 가장 어려웠던 경험과 이를 해결하기 위해
                했던 노력을 기술하고,
              </p>
              <p>
                SSAFY에 지원하신 동기에 대해서도 작성 바랍니다. (500자 내외/ 최대
                600자 까지)
              </p>
            </div>
          )}
        </div>

        <div className="pt-6">
          <div
            className={`flex ${
              showCorrection ? 'flex-row space-x-4' : 'flex-col'
            }`}
          >
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

            {showCorrection && (
              <div className="block p-4 w-full h-64 text-sm text-gray-900 rounded-lg border border-gray-400">
                첨삭 내용
              </div>
            )}
          </div>
          <div className="flex">
            <Button text="저장" type="ESSAYSAVE" onClick={handleEssaySave} />
          </div>
        </div>
      </div>
    </>
  );
}
