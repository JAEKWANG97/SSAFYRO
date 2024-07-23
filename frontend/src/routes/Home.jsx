import React from "react";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 flex w-3/5  bg-[#E3F2FD]">
        <img src="/public/main/main_characters.png" alt="Main Characters" className="w-1/4 mr-4 rounded-lg" />
        <div className="w-3/4 flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-4 text-[#1E88E5]">싸피로 가는 지름길</h1>
          <p className="mb-2 text-[#1E88E5]">
            국내 최고의 SW 취업지원 프로그램 발레!!!
            <br />
            삼성의 SW 교육 경험을 바탕으로 취업 준비생에게 SW 역량 향상 교육과
            다양한 취업 지원 서비스를 제공하여 성공적인 취업을 돕습니다.
          </p>
          <p className="font-semibold text-[#1E88E5]">
            지금 빠르게 준비해 SSAFYROOM에서 시작하세요!
          </p>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="container mx-auto p-4 mt-16">
  //     <div className="flex justify-between items-stretch min-h-full">
  //       <div className="w-2/3 bg-blue-100 p-6 rounded-lg shadow-lg mr-10 flex items-center">
  //         <div className="flex items-center w-full h-full">
  //           <div className="w-1/2 flex justify-center h-full">
  //             <img
  //               src="/public/main/main_characters.png"
  //               alt="Main Character"
  //               className="h-full object-contain"
  //             />
  //           </div>
  //           <div className="w-3/4 pl-6 pr-6 h-full flex flex-col justify-center">
  //             <h2 className="text-3xl font-bold mb-4 text-blue-800">
  //               싸피로 가는 지름길
  //             </h2>
  //             <p className="text-lg text-gray-700 leading-relaxed">
  //               국내 최고의 SW 역량강화 프로그램 싸피!!! 삼성의 SW 교육 노하우를
  //               바탕으로 취업 준비생에게 SW 역량 향상 교육과 다양한 취업 지원
  //               서비스를 제공하여 성공적인 취업을 돕습니다. 지금 싸피 준비를
  //               SSAFYRO에서 시작하세요!
  //             </p>
  //           </div>
  //         </div>
  //       </div>

  //       <div
  //         className="w-1/3 bg-white p-8 rounded-lg shadow-lg flex flex-col items-center border border-gray-300"
  //         style={{ borderColor: "#E2E5EB" }}
  //       >
  //         <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
  //           로그인
  //         </h2>
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           width="1em"
  //           height="1em"
  //           viewBox="0 0 256 256"
  //           className="w-12 h-12 mb-6"
  //         >
  //           <path
  //             fill="currentColor"
  //             d="M208 80h-32V56a48 48 0 0 0-96 0v24H48a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16M96 56a32 32 0 0 1 64 0v24H96Zm112 152H48V96h160zm-68-56a12 12 0 1 1-12-12a12 12 0 0 1 12 12"
  //           ></path>
  //         </svg>
  //         <p className="text-lg text-center text-gray-700 mb-6">
  //           원활한 서비스 이용을 위해 <br />
  //           로그인을 해 주세요.
  //         </p>
  //         <button className="bg-blue-500 text-white text-lg px-6 py-3 rounded hover:bg-blue-700 w-full flex items-center justify-center">
  //           로그인
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             width="1em"
  //             height="1em"
  //             viewBox="0 0 24 24"
  //             className="ml-2"
  //           >
  //             <path
  //               fill="currentColor"
  //               d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z"
  //             ></path>
  //           </svg>
  //         </button>
  //       </div>
  //     </div>

  //     <div className="flex mt-12 space-x-4">
  //       <div
  //         className="text-white p-4 rounded-lg flex-1"
  //         style={{ backgroundColor: "rgba(198, 234, 246, 0.5)" }}
  //       >
  //         <h1>에세이</h1>
  //       </div>

  //       <div
  //         className="text-white p-4 rounded-lg flex-1"
  //         style={{ backgroundColor: "rgba(231, 226, 253, 0.5)" }}
  //       >
  //         <h1>에세이</h1>
  //       </div>
  //     </div>
  //   </div>
  // );
}
