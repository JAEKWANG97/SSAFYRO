import { useState } from 'react';

export default function Navbar() {
  // userId는 로그인된 사용자를 구분하는 변수로 할당될 예정
  const userId = 1;
  const [isLogin, setIsLogin] = useState(false); // 로그인을 관리하는 상태

  const loginTrigger = () => {
    setIsLogin(!isLogin); // 테스트를 위해 로그인 상태 토글
  };

  return (
    <>
      <nav className="flex items-center py-3 px-4 text-lg bg-white ">
        {/* 로고 자리 */}
        <div className="flex-shrink-0">
          <a className="font-extrabold text-4xl" href="/">
            <img className="h-[35px] inline pr-4" src="/SSAFYRO.png" alt="SSAFYRO 로고" />
            SSAFYRO
          </a>
        </div>
        {/* 메뉴 자리 */}
        <div className="flex-grow text-center">
          <a className="mx-3 font-semibold hover:text-[#90CCF0]" href="/first">
            1차 전형 준비
          </a>
          <a className="mx-3 font-semibold hover:text-[#90CCF0]" href="/second/guide/personality">
            2차 전형 준비
          </a>
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
