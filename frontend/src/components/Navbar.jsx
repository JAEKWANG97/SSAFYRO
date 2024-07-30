import React, { useState, useEffect, useRef } from "react";
import useFirstStore from "../stores/FirstStore";

export default function Navbar() {
  const userId = 1; // 임의로 지정
  const [isLogin, setIsLogin] = useState(false); // 로그인을 관리하는 상태
  const [dropdown1Open, setDropdown1Open] = useState(false); // 드롭다운 1 상태
  const [dropdown2Open, setDropdown2Open] = useState(false); // 드롭다운 2 상태

  const dropdown1Ref = useRef(null);
  const dropdown2Ref = useRef(null);

  const loginTrigger = () => {
    setIsLogin(!isLogin); // 테스트를 위해 로그인 상태 토글
  };

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


  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-8 px-64" style={{ minWidth: "1100px" }}>
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
              <div className="absolute bg-white divide-y divide-gray-100 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform opacity-100 translate-y-1 w-[130px]" style={{ top: "100%", left: "0" }}>
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <a
                      href="/first/essay"
                      className="block px-6 py-3 hover:bg-gray-100"
                    >
                      에세이
                    </a>
                  </li>
                  <li>
                    <a
                      href="/first/test"
                      className="block px-6 py-3 hover:bg-gray-100"
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
              <div className="absolute bg-white divide-y divide-gray-100 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform opacity-100 translate-y-1 w-[140px]" style={{ top: "100%", left: "0" }}>
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <a
                      href="/second/guide/personality"
                      className="block px-6 py-3 hover:bg-gray-100"
                    >
                      면접 가이드
                    </a>
                  </li>
                  <li>
                    <a
                      href="/second/interview"
                      className="block px-6 py-3 hover:bg-gray-100"
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
              <a
                className="mx-8 font-semibold hover:text-[#90CCF0] whitespace-nowrap"
                href={`/account/profile/${userId}`}
              >
                프로필
              </a>
              <button
                className="mx-3 font-semibold hover:text-[#90CCF0]"
                onClick={loginTrigger}
              >
                로그아웃
              </button>
            </>
          ) : (
            <a
              className="mx-3 font-semibold hover:text-[#90CCF0] whitespace-nowrap"
              href="/account/login"
            >
              로그인
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
