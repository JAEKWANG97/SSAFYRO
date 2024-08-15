import ServiceContents from "./ServiceContents";
import maincharacter from "./../../../public/main/main_characters.png";
import UserImg from "./../../../public/main/drawing1.jpg";
import useAuthStore from "../../stores/AuthStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUserStore from "../../stores/userStore";
import { initUserType, getUserInfo } from "../../api/profileApi";
import Swal from "sweetalert2";
export default function MemberContents() {
  const nav = useNavigate();
  const APIURL = "https://i11c201.p.ssafy.io:8443/api/v1/reports/score-average";
  const Token = localStorage.getItem("Token");
  const roomTypes = ["PERSONALITY", "PRESENTATION"];
  const [personScore, setPersonScore] = useState(null);
  const [ptScore, setPtScore] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    getUserInfo().then((data) => setUserType(data.type));
    if (getUserInfo().type === null) {
      console.log("전공자 비전공자 선택");
      Swal.fire({
        title: "전공자 / 비공자 선택",
        text: "당신의 전공을 선택하세요",
        icon: "question",
        showCancelButton: false, // 기본 취소 버튼을 사용하지 않음
        showConfirmButton: false, // 기본 확인 버튼을 사용하지 않음
        html: `
          <button id="major-button" class="swal2-confirm swal2-styled" style="margin-right: 10px;">
            전공자
          </button>
          <button id="nonmajor-button" class="swal2-cancel swal2-styled">
            비전공자
          </button>
        `,
        didOpen: () => {
          const majorButton = Swal.getPopup().querySelector("#major-button");
          const nonmajorButton =
            Swal.getPopup().querySelector("#nonmajor-button");

          majorButton.addEventListener("click", () => {
            Swal.fire({
              title: "전공자를 선택하셨습니다!",
              icon: "success",
              confirmButtonText: "확인",
              // cancelButtonColor
            }).then(async () => {
              await initUserType("MAJOR");
              const userInfoData = await getUserInfo();
              setUserType(userInfoData.type);
            });
          });

          nonmajorButton.addEventListener("click", () => {
            Swal.fire({
              title: "비전공자를 선택하셨습니다!",
              icon: "success",
              confirmButtonText: "확인",
            }).then(async () => {
              await initUserType("NON_MAJOR");
              const userInfoData = await getUserInfo();
              setUserType(userInfoData.type);
              console.log(userInfoData);
            });
          });
        },
      });
    }

    const fetchData = () => {
      const requests = roomTypes.map((type) =>
        axios.get(APIURL, {
          params: { roomType: type },
          headers: { Authorization: `Bearer ${Token}` },
        })
      );

      Promise.all(requests)
        .then((responses) => {
          responses.forEach((response, index) => {
            const roomType = roomTypes[index];
            const data = response.data.response;

            if (roomType === "PERSONALITY" && data) {
              setPersonScore(data.totalScore);
            } else if (roomType === "PRESENTATION" && data) {
              setPtScore(data.totalScore);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, [Token]);

  const userInfo = useAuthStore((state) => state.userInfo);
  console.log(userInfo);
  const handleProfileClick = () => {
    if (userInfo && userInfo.userId) {
      navigate("/account/profile", { state: { userId: userInfo.userId } });
    } else {
      console.error("User info가 없습니다.");
    }
  };

  return (
    <div className="flex justify-center">
      <div
        className="container mx-auto mt-16 overflow-hidden max-w-6xl"
        style={{ minWidth: "1000px" }}
      >
        <div className="flex">
          <div className="w-2/3 h-[375px] mr-10 rounded-xl p-8 flex items-center bg-gradient-to-r from-sky-500 to-purple-300">
            <div className="flex items-start w-full p-4 mt-10">
              <div className="flex-grow text-white drop-shadow-sm pt-12">
                <p className="text-4xl font-extrabold pb-8">
                  SSAFY로 가는 지름길
                </p>
                <p className="text-xl font-semibold mb-0 pb-0">
                  막막한 SSAFY 입과 준비
                </p>
                <p className="text-xl font-semibold mb-0 pb-0">
                  SSAFYRO에서 시작하세요
                </p>
              </div>
              <div className="flex-none">
                <img
                  src={maincharacter}
                  alt="Main Character"
                  className="object-contain"
                  style={{ height: "80%", width: "90%" }}
                />
              </div>
            </div>
          </div>

          <div className="w-1/3 h-[375px] rounded-xl bg-purple-200">
            <div className="flex items-center justify-center w-full mt-8 mb-6">
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-gray-200">
                <img
                  src={UserImg}
                  alt="Main Character"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-center mt-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {userInfo.userName} 님의 합격 지수
              </h2>
              <p className="font-bold">
                <span className="text-3xl text-cyan-600">
                  {personScore !== null && ptScore !== null
                    ? Math.round((personScore + ptScore) / 2)
                    : "Score"}
                </span>{" "}
                <span className="text-xl text-gray-800">점</span>
              </p>
            </div>
            <div className="w-full flex justify-center mt-4">
              <button
                className="mx-4 text-white font-bold px-4 py-3 rounded-xl w-[300px] bg-neutral-500/25 border-2 border-white hover:bg-gradient-to-r hover:from-purple-400/50 hover:to-pink-400/50"
                onClick={() => {
                  nav("/account/profile");
                }}
              >
                마이페이지 바로가기
              </button>
            </div>
          </div>
        </div>

        <ServiceContents />
      </div>
    </div>
  );
}
