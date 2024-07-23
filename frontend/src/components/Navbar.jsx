import { useState } from "react";

export default function Navbar() {
  const userId = 1;
  const [isLogin, setIsLogin] = useState(false); // 로그인을 관리하는 상태

  const loginTrigger = () => {
    setIsLogin(!isLogin); // 테스트를 위해 로그인 상태 토글
  };

  return (
    <>
      <nav className="flex items-center py-8 px-6 text-lg bg-white shadow-md">
        {/* 로고 자리 */}
        <div className="flex-shrink-0">
          <a className="font-extrabold text-3xl" href="/">
            <img className="h-[25px] inline pr-4" src="/SSAFYRO.png" alt="SSAFYRO 로고" />
            SSAFYRO
          </a>
        </div>

        {/* 메뉴 자리 */}
        <div className="flex-grow text-center relative">
          <div className="relative inline-block group">
            <a className="mx-3 font-semibold hover:text-[#90CCF0]" href="/first">
              1차 전형 준비
            </a>
            <div className="absolute hidden group-hover:block bg-white divide-y divide-gray-100 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform opacity-0 group-hover:opacity-100 group-hover:translate-y-1">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <a href="/first" className="block px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    에세이
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    SW적성진단
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="relative inline-block group">
            <a className="mx-3 font-semibold hover:text-[#90CCF0]" href="/second/guide/personality">
              2차 전형 준비
            </a>
            <div className="absolute hidden group-hover:block bg-white divide-y divide-gray-100 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform opacity-0 group-hover:opacity-100 group-hover:translate-y-1">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <a href="/second/guide/personality" className="block px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    면접가이드
                  </a>
                </li>
                <li>
                  <a href="/second/interview" className="block px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    면접연습
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 회원 메뉴 */}
        <div className="flex-shrink-0 text-end">
          {isLogin ? (
            <>
              <a className="mx-3 font-semibold hover:text-[#90CCF0]" href={`/account/profile/${userId}`}>프로필</a>
              <button className="mx-3 font-semibold hover:text-[#90CCF0]">로그아웃</button>
            </>
          ) : (
            <a className="mx-3 font-semibold hover:text-[#90CCF0]" href="/account/login">로그인</a>
          )}
        </div>
      </nav>
      <button onClick={loginTrigger}>login</button>
    </>
  );
}
