import React from "react";

export default function Home() {
  return (
    <div className="container mx-auto flex mt-16 overflow-hidden max-w-6xl" style={{ minWidth: '840px' }}>
      <div className="w-2/3 h-[375px] mr-16 rounded-lg bg-blue-100 p-8 flex items-center bg-gradient-to-r from-sky-500 to-indigo-500 relative justify-center" >
        <div className="flex">
          <img src="/public/main/main_characters.png" alt="Main Character"/>
        </div>
        <div className="absolute bottom-6 right-6 text-white drop-shadow-sm">
          <h1 className="text-3xl font-bold">SSAFY로 가는 지름길, 싸피로</h1>
          <p>지금, SSAFY 입과 준비를 SSAFYRO에서 시작하세요.</p>
        </div>
      </div>
      <div className="w-1/3 h-[375px] border rounded-lg flex flex-col items-center " style={{ borderColor: '#E2E5EB' }}>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 mt-8">로그인</h2>
        <hr className="w-4/5 border-t-1 border-gray-300 mb-6" style={{ borderColor: '#E2E5EB' }} />
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" className="w-12 h-12 mt-4 mb-4">
          <path fill="currentColor" d="M208 80h-32V56a48 48 0 0 0-96 0v24H48a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16M96 56a32 32 0 0 1 64 0v24H96Zm112 152H48V96h160zm-68-56a12 12 0 1 1-12-12a12 12 0 0 1 12 12"/>
        </svg>
        <div className="mx-20">
        <h5 className="text-center mb-6">원활한 서비스 이용을 위해 로그인해 주세요.</h5>
        </div>
        <button className="text-white mt-4 px-4 py-3 rounded flex items-center justify-center w-[300px]" style={{ backgroundColor: '#2090FF'}}>
          로그인
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="ml-auto">
            <path fill="currentColor" d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z"/>
          </svg>
        </button>
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
