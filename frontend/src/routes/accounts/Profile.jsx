import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EssayDetail from "./components/EssayDetail";
import InterviewResult from "./components/InterviewResult";
import UserImg from "./../../../public/main/user.jpg";
import PersonaltyImg from "./../../../public/profile/personality.png";
import PtImg from "./../../../public/profile/pt.png";
import Button from "./../../../src/components/Button";
import TestList from "./components/TestList";
import InterviewList from "./components/InterviewList";
import Swal from "sweetalert2";
import useAuthStore from "../../stores/AuthStore";
import LoginAlert from "../../components/LoginAlert";
import Loading from "../components/Loading";

import {
  getUserInfo,
  getInterviewInfo,
  getEssayData,
} from "../../api/profileApi";
import useUserStore from "../../stores/userStore";

import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";

export default function Profile() {
  const nav = useNavigate();
  const location = useLocation();
  const Token = localStorage.getItem("Token");

  const { userInfo, setUserInfo } = useUserStore();
  const [interviewInfo, setInterviewInfo] = useState([]);
  const [essayData, setEssayData] = useState(null);
  const [fillActive, setFillActive] = useState("tab1");
  const [isLoading, setIsLoading] = useState(true);
  const isLogin = useAuthStore((state) => state.isLogin); // 로그인 유무

  <LoginAlert />;

  useEffect(() => {
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
  }, [Token, nav]);

  // 초기 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      // 유저 정보 가져오기
      const userInfoData = await getUserInfo();
      setUserInfo(userInfoData);
      console.log(userInfoData);
      setIsLoading(false);
    };

    fetchData();

    // 탭 설정이 없으면 기본 탭으로 설정
    if (!location.state?.activeTab) {
      setFillActive("tab1");
    }

    console.log(isLoading);
  }, [location.state]);

  // 탭 상태 관리
  useEffect(() => {
    if (location.state?.activeTab) {
      setFillActive(location.state.activeTab);
    }
  }, [location.state]);

  // 탭 상태에 따라 스크롤 위치 조정
  useEffect(() => {
    if (fillActive === "tab2" || fillActive === "tab3") {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [fillActive]);

  const handleFillClick = (value) => {
    if (value === fillActive) return;
    setFillActive(value);
    nav(location.pathname, { state: { activeTab: value } });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="container mx-auto p-5 max-w-2xl bg-white rounded-lg shadow-md mt-10 mb-20">
        <div className="flex justify-center py-3">
          <div className="flex items-center mb-6 gap-9">
            <img
              src={UserImg}
              alt="UserImg"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div>
              <div className="flex items-center gap-3 pb-3">
                <h2 className="text-2xl font-semibold text-center">
                  {userInfo.nickname}
                </h2>
                <Button
                  text={userInfo.type === "MAJOR" ? "전공자" : "비전공자"}
                  type={userInfo.type === "MAJOR" ? "MAJOR" : "NONMAJOR"}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">
                  인성 모의 면접{" "}
                  <span className="font-bold text-gray-900">
                    {userInfo.personalCount}
                  </span>{" "}
                  회
                </span>
                <span className="text-sm text-gray-500">
                  PT 모의 면접{" "}
                  <span className="font-bold text-gray-900">
                    {userInfo.presentationCount}
                  </span>{" "}
                  회
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t-10 pb-5" />
        <InterviewResult />
        <hr className="border-t-10 mt-5" />

        <div className="mt-10 mb-3">
          <TETabs fill>
            <TETabsItem
              onClick={() => handleFillClick("tab1")}
              active={fillActive === "tab1"}
              className={`pb-4  !text-base !font-extrabold ${
                fillActive === "tab1"
                  ? "border-b-2 border-gray-800 text-gray-800"
                  : "text-gray-400"
              }`}
            >
              에세이
            </TETabsItem>
            <TETabsItem
              onClick={() => handleFillClick("tab2")}
              active={fillActive === "tab2"}
              className={`pb-4 !text-base !font-extrabold ${
                fillActive === "tab2"
                  ? "border-b-2 border-gray-800 text-gray-800"
                  : "text-gray-400"
              }`}
            >
              적성진단
            </TETabsItem>
            <TETabsItem
              onClick={() => handleFillClick("tab3")}
              active={fillActive === "tab3"}
              className={`pb-4 !text-base !font-extrabold ${
                fillActive === "tab3"
                  ? "border-b-2 border-gray-800 text-gray-800"
                  : "text-gray-400"
              }`}
            >
              면접
            </TETabsItem>
          </TETabs>

          <TETabsContent>
            <TETabsPane show={fillActive === "tab1"}>
              <EssayDetail />
            </TETabsPane>
            <TETabsPane show={fillActive === "tab2"}>
              <TestList />
            </TETabsPane>
            <TETabsPane show={fillActive === "tab3"}>
              <InterviewList />
            </TETabsPane>
          </TETabsContent>
        </div>
        <div className="flex pb-10 items-center relative pt-4 "></div>
      </div>
    </div>
  );
}
