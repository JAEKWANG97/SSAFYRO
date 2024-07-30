import SecondNav from "../components/SecondNav.jsx";
import GuideNav from "./components/GuideNav.jsx";
import personalityimg from './../../../../public/first/personality.png';

export default function GuidePT() {
  return (
    <>
      <SecondNav />
      <GuideNav />
      <div className="container mx-auto p-5 max-w-3xl bg-gray-50 rounded-lg shadow-lg mt-10">
        <div className="image-container text-center mb-8">
          <img src={personalityimg} className="main-image w-[400px] h-[300px] rounded-lg mx-auto" alt="personalityimg" />
        </div>
        <div className="content px-10">
          <h1 className="title text-3xl mt-12 mb-10 font-bold text-center text-gray-800">PT 면접 가이드</h1>
          <div className="text text-base mb-5 text-gray-700 leading-loose">
            <h2 className="text-2xl font-semibold mb-4">면접 진행 절차</h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>pt 모의 면접은 싸피로에서 준비한 주제와 질문을 기반으로 진행됩니다.</li>
              <li>모의면접 참여인원이 1인일 경우, ai 면접이 진행됩니다. 2인 이상일 경우 다대일 비대면 면접이 진행됩니다.</li>
              <li>2인 이상일 경우 역할(면접자, 면접관)이 교대되면서 진행됩니다.</li>
              <li>PT 발표 이후, 본인이 발표한 내용을 기반으로 AI 기반의 질의응답이 이루어집니다.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">설명서</h2>
            <ol className="list-decimal list-inside mb-6 space-y-2">
              <li>에세이 탭에서 전공 유무에 따른 에세이 예상 질문을 확인해주세요.</li>
              <li>주어진 질문에 맞게 에세이를 작성하고 저장해주세요. AI 첨삭도 받을 수 있어요!</li>
              <p className="ml-5 text-sm">※ 프로필의 에세이 란에 작성한 에세이를 수정 및 업로드할 수 있습니다.</p>
              <li>면접 연습하기 탭에서 직접 인성 면접 방을 생성하거나, 생성된 인성 면접 방에 들어가서 빠르게 면접을 시작할 수 있어요.</li>
              <li>면접 대기실에서 인성 면접 진행 팁을 숙지한 후, 면접을 시작해주세요!</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
