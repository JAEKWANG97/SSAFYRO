import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/AuthStore";

export default function Social() {
  const nav = useNavigate();
  const setIsLogin = useAuthStore((state) => state.setIsLogin);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const nickname = urlParams.get("nickname");
    const userId = urlParams.get("userId");

    if (token) {
      localStorage.setItem("Token", token);

      const userInfo = {
        userId: userId,
        userName: nickname
      };
      
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setUserInfo(userInfo);
      setIsLogin(true);
      nav("/");
    } else {
      console.error("토큰을 찾을 수 없습니다.");
      nav("/login"); // 로그인 페이지로 이동
    }
  }, [nav, setIsLogin, setUserInfo]);

  return (
    <>
      <h1>로딩중입니다.</h1>
    </>
  );
}
