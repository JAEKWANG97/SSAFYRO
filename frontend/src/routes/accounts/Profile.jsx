import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EssayDetail from './components/EssayDetail';
import InterviewResult from './components/InterviewResult';
import UserImg from './../../../public/main/user.jpg';
import PersonaltyImg from './../../../public/profile/personality.png';
import PtImg from './../../../public/profile/pt.png';
import useAuthStore from '../../stores/AuthStore';
import Button from './../../../src/components/Button';
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";

export default function Profile() {
  const nav = useNavigate();
  const location = useLocation();
  // const userId = location.state?.userId;
  const APIURL = "https://i11c201.p.ssafy.io:8443/api/v1/";
  const Token = localStorage.getItem("Token");
  const [userInfo, setUserInfo] = useState({})  // 유저정보(닉네임, 전공유무, 이미지, 인성면접 횟수, pt면접 횟수)
  const [fillActive, setFillActive] = useState("tab1");
  const [interviewInfo, setInterviewInfo] = useState([]) // 면접정보[{레포트ID, 면접종류, 총점, 발음점수, 면접일시}]

  useEffect(() => {
    // 유저 정보 불러오기
    axios
      .get(`${APIURL}users`, 
        {headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        setUserInfo(res.data.response);
      })
      .catch((error) => {
        console.log(error);
      });

      if (!location.state?.activeTab) {
        setFillActive("tab1");
      }
  }, []);

  useEffect(() => {
   
    const Info = localStorage.getItem('userInfo')
    const parsedInfo = JSON.parse(Info);

    // 유저 정보 불러오기
    axios
      .get(`${APIURL}reports`, {
        params: {
          userId: parsedInfo.userId,  // userId를 parsedInfo 객체에서 가져옵니다.
          page: 1,
          size: 10,
        }, 
        headers: {
          Authorization: `Bearer ${Token}`,
        },
        })
        .then((res) => {
          console.log(res.data.response);
          setInterviewInfo(res.data.response.reports)
        })
        .catch((error) => {
          console.log(error);
        });

      }, []);


  useEffect(() => {
    if (location.state?.activeTab) {
      setFillActive(location.state.activeTab);
    }
  }, [location.state]);

  
  useEffect(() => {
    if (fillActive === "tab2" || fillActive === "tab3") {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [fillActive]);

  // const userInfo = useAuthStore((state) => state.userInfo); 
  // const interviewInfo = [
  //   {type: 1, title: '전공자 인성 면접', room : 1},
  //   {type: 2, title: '전공자 PT 면접', room : 2},
  //   {type: 1, title: '0810', room : 3},
  //   {type: 2, title: '0810', room : 4},
  //   {type: 2, title: '0810', room : 5}
  // ];

  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }
    setFillActive(value);

    // 현재 탭 상태를 location.state에 저장
    nav(location.pathname, { state: { activeTab: value } });
  };

  return (
    <div>
      <div className="container mx-auto p-5 max-w-2xl bg-white rounded-lg shadow-md mt-10 mb-20">
        <div className='flex justify-center py-3'>
          <div className="flex items-center mb-6 gap-9">
            <img 
              src={UserImg} 
              alt="UserImg" 
              style={{
                width: '100px', 
                height: '100px', 
                borderRadius: '50%', 
                objectFit: 'cover', 
              }}
            />
            <div>
              <div className="flex items-center gap-3 pb-3">
                <h2 className="text-2xl font-semibold text-center">{userInfo.nickname}</h2>
                <Button
                  text={userInfo.type === 'MAJOR' ? '전공자' : '비전공자'} 
                  type={userInfo.type === 'MAJOR' ? 'MAJOR' : 'NONMAJOR'} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">
                  인성 모의 면접 <span className="font-bold text-gray-900">{userInfo.personalCount}</span> 번
                </span> 
                <span className="text-sm text-gray-500">
                  PT 모의 면접 <span className="font-bold text-gray-900">{userInfo.presentationCount}</span> 번
                </span>
              </div>

            </div>
          </div>
        </div>

        <hr className="border-t-10 pb-5"/>
        <InterviewResult/>
        <hr className="border-t-10 mt-5"/>

        <div className="mt-10 mb-3">
          <TETabs fill>
            <TETabsItem
              onClick={() => handleFillClick("tab1")}
              active={fillActive === "tab1"}
              className={`pb-4 !text-base !font-extrabold ${fillActive === "tab1" ? 'border-b-2 border-gray-800 text-gray-800' : 'text-gray-400'}`}
            >
              에세이
            </TETabsItem>
            <TETabsItem
              onClick={() => handleFillClick("tab2")}
              active={fillActive === "tab2"}
              className={`pb-4 !text-base !font-extrabold ${fillActive === "tab2" ? 'border-b-2 border-gray-800 text-gray-800' : 'text-gray-400'}`}
            >
              적성진단
            </TETabsItem>
            <TETabsItem
              onClick={() => handleFillClick("tab3")}
              active={fillActive === "tab3"}
              className={`pb-4 !text-base !font-extrabold ${fillActive === "tab3" ? 'border-b-2 border-gray-800 text-gray-800' : 'text-gray-400'}`}
            >
              면접
            </TETabsItem>
          </TETabs>

          <TETabsContent>
            <TETabsPane show={fillActive === "tab1"}>
              <EssayDetail />
            </TETabsPane>
            <TETabsPane show={fillActive === "tab2"}>
              {/* Dashboard content */}
            </TETabsPane>
            <TETabsPane show={fillActive === "tab3"}>
              <div className="pl-7">
                <div 
                  className="max-w-xl h-[80px] border rounded-xl flex flex-col font-extrabold pl-4 pt-4 relative transition-transform transform hover:scale-105"
                  onClick={() => nav('bestworst_feedback', { state: { activeTab: "tab3" } })}
                >
                  이 질문들에서 점수를 높일 방법은?
                  <span className="text-sm font-medium pt-1">구체적인 피드백을 받아보세요</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-4 pl-6">
                {interviewInfo.map((info, index) => (
                  <div
                    key={index}
                    className="w-[132px] h-[100px] rounded-xl flex flex-col items-center justify-center text-gray-500 transition-shadow hover:shadow-lg"
                    style={{ backgroundColor: "rgba(240, 240, 240, 0.8)" }}
                    onClick={() => info.type === "PERSONALITY" ? nav('personality_feedback', { state: { info, activeTab: "tab3" } }) : nav('pt_feedback', { state: { info, activeTab: "tab3" } })}
                  >
                    <img 
                      src={info.type === "PERSONALITY" ? PersonaltyImg : PtImg} 
                      alt={info.type === "PERSONALITY" ? "Personality Interview" : "PT Interview"} 
                      className="w-10 h-10 mb-2" 
                    />
                    <p className="font-medium text-sm text-center">{info.title}</p>
                  </div>
                ))}
              </div>

            </TETabsPane>
          </TETabsContent>
        </div>
        <div className="flex pb-10 items-center relative pt-4 ">
        </div>
      </div>
    </div>
  );
}
