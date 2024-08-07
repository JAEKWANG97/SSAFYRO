import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "./../../stores/AuthStore"

export default function Kakao() {
  const nav = useNavigate();
  const setIsLogin = useAuthStore((state) => state.setIsLogin)

  useEffect(() => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("Token", token);
      setIsLogin(true)
      nav("/");
      
    } else {
      console.error("토큰을 찾을 수 없습니다.");
      nav("/login"); // 로그인 페이지로 이동
    }
  }, [nav]);

  return (
    <>
      <h1>로딩중입니다.</h1>
    </>
  );
}
