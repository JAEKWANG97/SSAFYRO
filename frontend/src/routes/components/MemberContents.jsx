import ServiceContents from "./ServiceContents";

export default function MemberContents() {
  return (
    <div
      className="container mx-auto mt-16 overflow-hidden max-w-6xl"
      // style={{ minWidth: "1100px" }}
    >
      <div className="flex">
        <div
          className="w-2/3 h-[375px] mr-10 rounded-xl p-8 flex items-center relative justify-center"
          style={{
            background:
              "linear-gradient(to right, rgba(56, 189, 248, 0.5), rgba(67, 56, 202, 0.3))",
          }}
        >
          <div>
            <img src="/public/main/main_characters.png" alt="Main Character" />
          </div>
          <div className="absolute bottom-6 right-6 text-white drop-shadow-sm">
            <h1 className="text-3xl font-bold">SSAFY로 가는 지름길, 싸피로</h1>
            <p>지금, SSAFY 입과 준비를 SSAFYRO에서 시작하세요.</p>
          </div>
        </div>

        <div
          className="w-1/3 h-[375px] rounded-xl bg-purple-200"
          // style={{ backgroundColor: "rgba(249, 255, 215, 0.5)" }}
          // style={{
          //   background:
          //     "linear-gradient(to right, rgba(67, 56, 202, 0.3), rgba(231, 226, 253, 0.5))",
          // }}
        >
          <div className="flex items-center justify-center w-full mt-8 mb-6">
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-gray-200">
              <img
                src="/public/main/drawing.jpg"
                alt="Main Character"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-center mt-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              UserName 님의 합격 지수
            </h2>
            <p className="font-bold">
              <span className="text-3xl text-cyan-600">Score</span>{" "}
              <span className="text-xl text-gray-800">점</span>
            </p>
          </div>
          <div className="w-full flex justify-center mt-4">
            <button className="mx-4 text-white font-bold px-4 py-3 rounded-xl w-[300px] bg-neutral-500/25 border-2 border-white hover:bg-gradient-to-r hover:from-purple-400/50 hover:to-pink-400/50">
              마이페이지 바로가기
            </button>
            {/* <button className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 font-bold px-4 py-3 rounded-xl w-[300px] bg-[#2090FF] hover:bg-[#1A78D6]">
              마이페이지 바로가기
            </button> */}
          </div>
        </div>
      </div>
      
      <ServiceContents />
      {/* <div className="flex">
        <button
          className="w-1/2 h-[250px] mr-10 rounded-xl mt-10 relative p-6 text-left flex"
          style={{ backgroundColor: "rgba(198, 234, 246, 0.5)" }}
        >
          <div>
            <div className="flex items-center mb-2">
              <span className="text-sm font-bold mr-1">에세이</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M340.864 149.312a30.59 30.59 0 0 0 0 42.752L652.736 512L340.864 831.872a30.59 30.59 0 0 0 0 42.752a29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
                ></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-1">
              SSAFY 전형 맟춤 에세이 첨삭 기능! <br />
              어려운 자소서, 이제는 쉽게!
            </h2>
            <p className="text-sm text-gray-600">
              SSAFY 전형 준비가 더 쉬워집니다
            </p>
          </div>
          <img
            src="/public/main/essay.png"
            alt="Essay"
            className="h-3/5 w-auto object-contain absolute bottom-12 right-10"
          />
        </button>

        <button
          className="w-1/2 h-[250px] rounded-xl mt-10 relative p-6 text-left flex"
          style={{ backgroundColor: "rgba(231, 226, 253, 0.5)" }}
        >
          <div>
            <div className="flex items-center mb-2">
              <span className="text-sm font-bold mr-1">CT & 코딩테스트</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M340.864 149.312a30.59 30.59 0 0 0 0 42.752L652.736 512L340.864 831.872a30.59 30.59 0 0 0 0 42.752a29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
                ></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-1">
              내용 <br />
              내용
            </h2>
            <p className="text-sm text-gray-600">
              AI 기반 추천 문제로 합격률 UP!{" "}
            </p>
          </div>
          <img
            src="/public/main/3d_coding.png"
            alt="Coding"
            className="h-3/5 w-auto object-contain absolute bottom-12 right-10"
          />
        </button>
      </div>

      <button
        className="w-full h-[250px] rounded-xl mt-10 relative p-6 mb-12 text-left flex"
        style={{ backgroundColor: "rgba(255, 239, 213, 0.5)" }}
      >
        <div>
          <div className="flex items-center mb-2">
            <span className="text-sm font-bold mr-1">PT & 인성면접</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="M340.864 149.312a30.59 30.59 0 0 0 0 42.752L652.736 512L340.864 831.872a30.59 30.59 0 0 0 0 42.752a29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
              ></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-1">
            내용 <br />
            내용
          </h2>
          <p className="text-sm text-gray-600">
            AI 기반 추천 문제로 합격률 UP!{" "}
          </p>
        </div>
        <img
          src="/public/main/3d_interview.png"
          alt="Interview"
          className="h-4/5 w-auto object-contain absolute bottom-8 right-10"
        />
      </button> */}
    </div>
  );
}
