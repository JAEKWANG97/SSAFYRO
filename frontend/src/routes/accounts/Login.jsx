import React from "react";
import Button from "./../../components/Button"
import { useNavigate } from "react-router-dom";


export default function Login() {

  const nav = useNavigate()


  return (
    <div className="flex items-start justify-center min-h-screen">
      <div className="w-full max-w-[350px] mx-auto p-10 bg-white shadow-xl rounded-lg flex flex-col items-center justify-center mt-40">
        <p className="text-2xl font-extrabold text-center text-[#000000] mb-8">
          SSAFYRO
        </p>
        <div className="flex flex-col items-center space-y-4 w-full">
         
          <Button
            type="KAKAO"
            text={
              <span className="inline-flex items-center justify-center">
                <img
                  src="/public/login/kakao.png"
                  alt="Kakao"
                  className="w-6 h-6 mr-2"
                />
                카카오 계정으로 로그인
              </span>
            }
            onClick={()=> window.location.href = 'https://i11c201.p.ssafy.io:8443/oauth2/authorization/kakao'}
          />
          <Button
            type="GOOGLE"
            text={
              <span className="inline-flex items-center justify-center">
                <img
                  src="/public/login/google.png"
                  alt="Google"
                  className="w-6 h-6 mr-2"
                />
                구글 계정으로 로그인
              </span>
            }
          />
          <Button
            type="NAVER"
            text={
              <span className="inline-flex items-center justify-center">
                <img
                  src="/public/login/naver.png"
                  alt="Naver"
                  className="w-6 h-6 mr-2"
                />
                네이버 계정으로 로그인
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
}
