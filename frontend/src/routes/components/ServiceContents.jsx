import essayImg from './../../../public/main/essay.png'
import codingImg from './../../../public/main/3d_coding.png'
import interviewImg from './../../../public/main/3d_interview.png'

export default function ServiceContents() {
  return (
    <>
      <div className="flex">
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
            <h2 className="text-xl font-bold mb-1 pt-10 pl-4">
              AI 기반 에세이 첨삭 기능 <br />
              어려운 자소서, 이제는 쉽게!
            </h2>
            <p className="text-sm text-gray-600 pt-2 pl-4">
              에세이를 더 효율적으로 준비해보세요.
            </p>
          </div>
          <img
            src={essayImg}
            alt="Essay"
            className="h-3/5 w-auto object-contain absolute bottom-12 right-10 pt-5"
          />
        </button>

        <button
          className="w-1/2 h-[250px] rounded-xl mt-10 relative p-6 text-left flex"
          style={{ backgroundColor: "rgba(231, 226, 253, 0.5)" }}
        >
          <div>
            <div className="flex items-center mb-2">
              <span className="text-sm font-bold mr-1">SW 적성진단</span>
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
            <h2 className="text-xl font-bold mb-1 pt-10 pl-4">
              SSAFY 맞춤 SW 적성진단  <br />
              CT & 코딩테스트 완전 정복!
            </h2>
            <p className="text-sm text-gray-600 pt-2 pl-4">
              알고리즘 추천 문제로 합격률 UP!
            </p>
          </div>
          <img
            src={codingImg}
            alt="Coding"
            className="h-3/5 w-[170px] object-contain absolute bottom-12 right-10 pt-5 pl-7"
          />
        </button>
      </div>

      <button
        className="w-full h-[250px] rounded-xl mt-10 relative p-6 mb-12 text-left flex"
        style={{ backgroundColor: "rgba(255, 239, 213, 0.5)" }}
      >
        <div>
          <div className="flex items-center mb-2">
            <span className="text-sm font-bold mr-1">인터뷰</span>
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
          <h2 className="text-xl font-bold mb-1 pt-8 pl-32">
            비대면 AI 면접 서비스<br />
             인성면접, PT 면접 대비를 한번에!
          </h2>
          <p className="text-sm text-gray-600 pt-2 pl-32">
            혼자서 or 다른 사람들과 이곳에서 함께 준비해보세요.
          </p>
        </div>
        <img
          src={interviewImg}
          alt="Interview"
          className="h-4/5 w-[850px] object-contain absolute bottom-8 right-10 pl-64"
        />
      </button>
    </>
  );
}
