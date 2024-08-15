import SecondNav from "../components/SecondNav.jsx";
import GuideNav from "./components/GuideNav.jsx";
import personalityimg from './../../../../public/first/personality.png';

export default function GuidePersonality() {
  return (
    <>
      <SecondNav />
      <GuideNav />
      <div className="container mx-auto p-5 max-w-3xl bg-white rounded-lg shadow-lg mt-10 mb-20">
        <div className="text-center mb-8">
          <img src={personalityimg} className="w-[380px] h-[300px] rounded-lg mx-auto" alt="인성 면접 가이드 이미지" />
        </div>
        <div className="px-8">
          <h1 className="text-3xl mt-8 mb-8 font-bold text-center text-gray-900">인성 면접 가이드</h1>
          <div className="text-lg mb-6 px-10 text-gray-800 leading-relaxed">
            <ol className="list-none mb-6 space-y-2 pl-12">
              <li className="flex items-center">
                <span className="text-blue-500">✔️</span>
                <span className="ml-2">인성 모의 면접은 <strong>에세이 기반</strong>으로 진행됩니다.</span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-500">✔️</span>
                <span className="ml-2">모의면접 참여 인원이 <strong>1인</strong>일 경우, <strong>AI 면접</strong>이 진행됩니다.</span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-500">✔️</span>
                <span className="ml-2"><strong>2인 이상</strong>일 경우, <strong>다대일 비대면 면접</strong>이 진행됩니다.</span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-500">✔️</span>
                <span className="ml-2"><strong>2인 이상</strong>일 경우,  <strong>역할(면접자, 면접관)이 교대</strong>되면서 진행됩니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500">✔️</span>
                <div className="ml-2">
                  <span>1분 자기소개 후, 에세이 기반으로 AI가 면접 질문을 생성하여</span>  
                  <span className="block ml-1">질의 혹은 추천해줍니다.</span>
                </div>
              </li>
              <li className="flex items-center">
                <span className="text-blue-500">✔️</span>
                <span className="ml-2">면접 대기실에서 <strong>면접 진행 팁</strong>을 숙지한 후, 면접을 시작하세요!</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
