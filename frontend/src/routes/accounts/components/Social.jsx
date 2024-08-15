import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/AuthStore";
import useUserStore from "../../../stores/userStore"; // userStore 임포트
import { getUserInfo } from '../../../api/profileApi';
import ChoiceType from "../../../components/ChoiceType";

export default function Social() {
  const nav = useNavigate();
  const setIsLogin = useAuthStore((state) => state.setIsLogin);
  const setUserInfo = useUserStore((state) => state.setUserInfo); // setUserInfo 함수 가져오기
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const nickname = urlParams.get("nickname");
    const userId = urlParams.get("userId");

    if (token) {
      localStorage.setItem("Token", token);

      const userInfo = {
        userId: userId,
        userName: nickname,
      };
      
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setIsLogin(true);

      getUserInfo()
        .then(async (res) => {
          setUserInfo(res); // userInfo를 userStore에 저장
          console.log(res)
          if (res.type === null) {
          <ChoiceType/>; // 전공자/비전공자 선택 페이지로 이동
          } else {
            nav("/"); // 메인 페이지로 이동
          }
        })
        .catch((error) => {
          console.error("유저 정보를 가져오는 중 오류 발생:", error);
        });
    } else {
      console.error("토큰을 찾을 수 없습니다.");
      nav("/login");
    }
  }, [nav, setIsLogin, setUserInfo]);

  return (
    <>
      {/* <h1>로딩중입니다.</h1> */}
    </>
  );
}
