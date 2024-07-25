// Room.jsx

import { useParams, useNavigate } from "react-router-dom";

export default function Room() {
  const { roomid } = useParams();
  const navigate = useNavigate();

  function navigateHandler() {
    navigate("/second/interview");
  }

  function startInterviewHandler() {
    navigate(`/second/interview/room/${roomid}/pt_ready`); // 수정된 부분
  }

  return (
    <div className="flex justify-center">
      <div
        className="w-9/10 mt-16 overflow-hidden"
        style={{ minWidth: "1100px" }}
      >
        <div className="w-full h-[80vh] border border-black mx-auto mt-5 p-6">
          <div className="flex justify-between items-center">
            <h1 className="font-extrabold text-2xl">PT</h1>
            <div className="flex items-center justify-center flex-grow">
              <img
                className="h-[25px] inline pr-4"
                src="/SSAFYRO.png"
                alt="SSAFYRO 로고"
              />
              <p className="font-extrabold text-2xl">SSAFYRO</p>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              onClick={navigateHandler}
            >
              나가기
            </button>
          </div>

          <div className="h-full">
            <div className="flex h-[70%] mt-5 p-4">
              <div
                className="w-4/5 border-gray-300 rounded-lg p-5"
                style={{ backgroundColor: "rgba(200, 200, 200, 0.2)" }}
              >
                참여자 나오는 칸
              </div>
              <div className="w-1/5 p-5">면접 팁 나오는 칸</div>
            </div>
            <div className="w-4/5 border h-[90%] mt-5 border-gray-300 rounded-lg p-5">
              메롱
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//   <div className="bg-white shadow-md rounded p-4 max-w-4xl w-full">
//     <div className="flex justify-between items-center mb-4">
//       <button onClick={navigateHandler} className="bg-gray-200 rounded px-4 py-2">PT</button>
//       <h1 className="text-xl font-bold">방 제목</h1>
//       <button onClick={navigateHandler} className="bg-gray-200 rounded px-4 py-2">나가기</button>
//     </div>
//     <div className="flex mb-4">
//       <div className="flex space-x-4">
//         <div className="w-20 h-28 bg-gray-300 flex items-center justify-center">
//           <span className="text-black">Icon 1</span>
//         </div>
//         <div className="w-20 h-28 bg-gray-300 flex items-center justify-center">
//           <span className="text-black">Icon 2</span>
//         </div>
//         <div className="w-20 h-28 bg-gray-300 flex items-center justify-center">
//           <span className="text-black">Icon 3</span>
//         </div>
//       </div>
//       <div className="flex-grow ml-4 bg-gray-100 p-4">
//         <h2 className="text-gray-500">면접 TIP</h2>
//       </div>
//     </div>
//     <div className="flex flex-col mb-4">
//       <input
//         type="text"
//         placeholder="텍스트를 입력하세요."
//         className="border border-gray-300 rounded p-2 mb-2"
//       />
//       <button className="bg-gray-200 rounded px-4 py-2 self-end">등록</button>
//     </div>
//     <button onClick={startInterviewHandler} className="bg-gray-200 rounded px-4 py-2 w-full">시작하기</button>
//   </div>
// </div>
