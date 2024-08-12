import { useState, useEffect, useRef } from "react";
import useAuthStore from "../stores/AuthStore";
import useFirstStore from "../stores/FirstStore";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const info = localStorage.getItem('userInfo')
  const setActiveTab = useFirstStore((state) => state.setActiveTab);
  const isLogin = useAuthStore((state) => state.isLogin);
  const setIsLogin = useAuthStore((state) => state.setIsLogin);
  const userInfo = useAuthStore((state) => state.userInfo); // userInfo에서 userId 가져오기
  const [dropdown1Open, setDropdown1Open] = useState(false); // 드롭다운 1 상태
  const [dropdown2Open, setDropdown2Open] = useState(false); // 드롭다운 2 상태
  const navigate = useNavigate();


  const dropdown1Ref = useRef(null);
  const dropdown2Ref = useRef(null);

  const toggleDropdown1 = () => {
    setDropdown1Open(!dropdown1Open);
    setDropdown2Open(false); // 다른 드롭다운은 닫기
  };

  const toggleDropdown2 = () => {
    setDropdown2Open(!dropdown2Open);
    setDropdown1Open(false); // 다른 드롭다운은 닫기
  };

  const handleClickOutside = (event) => {
    if (dropdown1Ref.current && !dropdown1Ref.current.contains(event.target)) {
      setDropdown1Open(false);
    }
    if (dropdown2Ref.current && !dropdown2Ref.current.contains(event.target)) {
      setDropdown2Open(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setDropdown1Open(false); // 드롭다운을 닫음
    setDropdown2Open(false); // 드롭다운을 닫음
    if (tab === "essay") {
      navigate("/first/essay");
    } else if (tab === "test") {
      navigate("/first/test");
    } else if (tab === "guide") {
      navigate("/second/guide/personality");
    } else if (tab === "interview") {
      navigate("/second/interview");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('userInfo');
    setIsLogin(false); 
  };

  const handleLoginClick = () => {
    navigate("/account/login"); 
  };

  const handleProfileClick = () => {
    if (userInfo && userInfo.userId) {
      navigate('/account/profile', { state: { userId: userInfo.userId } });
    } else {
      console.error("User info가 없습니다.");
    }
  };

  return (
    <div className="bg-white border-b">
      <div
        className="container mx-auto flex items-center justify-between py-8 px-64"
        style={{ minWidth: "1100px" }}
      >
        {/* 로고 자리 */}
        <div className="flex-shrink-0 min-w-[200px]">
          <a className="font-extrabold text-2xl flex items-center" href="/">
            <img
              className="h-[25px] inline pr-4"
              src="/SSAFYRO.png"
              alt="SSAFYRO 로고"
            />
            SSAFYRO
          </a>
        </div>

        {/* 메뉴 자리 */}
        <div className="flex-grow text-center relative flex justify-center">
          <div className="relative inline-block mx-8" ref={dropdown1Ref}>
            <a
              className="font-semibold hover:text-[#90CCF0] cursor-pointer whitespace-nowrap"
              onClick={toggleDropdown1}
            >
              1차 전형 준비
            </a>
            {dropdown1Open && (
              <div
                className="absolute bg-white divide-y divide-gray-100 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform opacity-100 translate-y-1 w-[130px]"
                style={{ top: "100%", left: "0" }}
              >
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <a
                      href="#"
                      className="block px-6 py-3 hover:bg-gray-100"
                      onClick={() => handleNavClick("essay")}
                    >
                      에세이
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-6 py-3 hover:bg-gray-100"
                      onClick={() => handleNavClick("test")}
                    >
                      SW 적성진단
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="relative inline-block mx-3" ref={dropdown2Ref}>
            <a
              className="font-semibold hover:text-[#90CCF0] cursor-pointer whitespace-nowrap"
              onClick={toggleDropdown2}
            >
              2차 전형 준비
            </a>
            {dropdown2Open && (
              <div
                className="absolute bg-white divide-y divide-gray-100 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform opacity-100 translate-y-1 w-[140px]"
                style={{ top: "100%", left: "0" }}
              >
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <a
                      href="#"
                      className="block px-6 py-3 hover:bg-gray-100"
                      onClick={() => handleNavClick("guide")}
                    >
                      면접 가이드
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-6 py-3 hover:bg-gray-100"
                      onClick={() => handleNavClick("interview")}
                    >
                      면접 연습하기
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 회원 메뉴 */}
        <div className="flex-shrink-0 min-w-[200px] text-end">
          {isLogin ? (
            <>
              <button
                className="mx-8 font-semibold hover:text-[#90CCF0] whitespace-nowrap"
                onClick={handleProfileClick}
              >
                프로필
              </button>
              <button
                className="mx-3 font-semibold hover:text-[#90CCF0]"
                onClick={handleLogout} // 로그아웃 버튼 클릭 시 이벤트 핸들러
              >
                로그아웃
              </button>
            </>
          ) : (
            <button
              className="mx-3 font-semibold hover:text-[#90CCF0] whitespace-nowrap"
              onClick={handleLoginClick} // 로그인 버튼 클릭 시 페이지 이동
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
