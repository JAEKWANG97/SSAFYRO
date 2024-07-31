import ServiceContents from "./ServiceContents";
import maincharacter from './../../../public/main/main_characters.png'

export default function GuestContents() {
  return (
    <div className="flex justify-center">
      <div
        className="container mx-auto mt-16 overflow-hidden max-w-6xl"
        style={{ minWidth: "900px" }}
      >
        <div className="flex">
          <div className="w-2/3 h-[375px] mr-10 rounded-xl p-8 flex items-center bg-gradient-to-r from-sky-500 to-purple-300">
            <div className="flex items-start w-full p-4 mt-6">
              <div className="flex-grow text-white drop-shadow-sm pt-12">
                <p className="text-3xl font-extrabold pb-3 mr-5">
                  SSAFY로 가는 지름길
                </p>
                <p className="text-3xl font-extrabold pb-4">
                  SSAFYRO
                </p>
                <p className='font-semibold mb-0 pb-0'>SSAFY 입과 준비</p>
                <p className='font-semibold mb-0 pb-0'>SSAFYRO에서 시작하세요</p>
              </div>
              <div className="flex-none">
                <img
                  src={maincharacter}
                  alt="Main Character"
                  className="object-contain"
                  style={{ height: '90%', width: '90%', marginLeft: '20px' }}
                />
              </div>
            </div>
          </div>

          <div
            className="w-1/3 h-[375px] border rounded-xl flex flex-col items-center bg-white shadow-sm"
            style={{ borderColor: "#E2E5EB" }}
          >
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 mt-8">
              로그인
            </h2>
            <hr
              className="border-t-1 border-gray-300 mb-6"
              style={{ borderColor: "#E2E5EB", width: "90%" }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 256 256"
              className="w-12 h-12 mt-4 mb-4"
            >
              <path
                fill="currentColor"
                d="M208 80h-32V56a48 48 0 0 0-96 0v24H48a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16M96 56a32 32 0 0 1 64 0v24H96Zm112 152H48V96h160zm-68-56a12 12 0 1 1-12-12a12 12 0 0 1 12 12"
              />
            </svg>
            <div className="mx-20">
              <h5 className="text-center mb-6">
                원활한 서비스 이용을 위해 로그인해 주세요.
              </h5>
            </div>
            <button className="relative text-white mt-4 mx-4 px-4 py-3 rounded-xl flex items-center justify-center w-[268px] bg-[#2090FF] hover:bg-[#1A78D6]">
              로그인
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="absolute right-4"
              >
                <path
                  fill="currentColor"
                  d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z"
                />
              </svg>
            </button>
          </div>
        </div>
        <ServiceContents />
        
      </div>
    </div>
  );
}
