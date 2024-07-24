// Interview.jsx

import { Outlet, useNavigate } from "react-router-dom";

export default function Interview() {
  const navigate = useNavigate();
  const onClickButton = () => {
    navigate("createroom");
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* <header className="bg-blue-100 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-xl font-bold">SSAFYRO</div>
                    <nav>
                        <a href="#" className="mx-2">1차 전형 준비</a>
                        <a href="#" className="mx-2">2차 전형 준비</a>
                        <a href="#" className="mx-2">로그인</a>
                    </nav>
                </div>
            </header> */}

      <main className="flex-grow bg-gray-100 p-6">
        <div className="container mx-auto">
          {/* <div className="border-b mb-4">
                        <nav className="flex">
                            <a href="#" className="px-4 py-2 text-blue-600 border-b-2 border-blue-600">면접가이드</a>
                            <a href="#" className="px-4 py-2 text-gray-600">면접연습하기</a>
                        </nav>
                    </div> */}
          <h1>모의 면접 방 목록</h1>
          <div className="flex">
            {/* 검색 필터 */}
            <div className="w-1/4 p-4 bg-white shadow rounded">
              <div className="mb-4">
                <label className="block mb-2">면접 종류 선택</label>
                <select className="w-full border p-2 rounded">
                  <option>전체</option>
                  <option>면접 종류 1</option>
                  <option>면접 종류 2</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">참여 인원 선택</label>
                <select className="w-full border p-2 rounded">
                  <option>전체</option>
                  <option>1명</option>
                  <option>2명</option>
                </select>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  모집중
                </label>
              </div>
              <button className="w-full bg-blue-600 text-white p-2 rounded">
                검색하기
              </button>
            </div>

            {/* 방 목록 */}
            <div className="w-3/4 p-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white shadow rounded p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm bg-green-200 text-green-800 py-1 px-2 rounded">
                      모집중
                    </span>
                    <span className="text-sm bg-purple-200 text-purple-800 py-1 px-2 rounded">
                      PT
                    </span>
                  </div>
                  <p className="text-gray-700">전공자 PT 준비방</p>
                  <p className="text-gray-500 text-sm">
                    열심히 모의 면접 해서 붙어봅시다!
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-600">1/3</span>
                    <button className="bg-blue-600 text-white py-1 px-2 rounded">
                      참여
                    </button>
                  </div>
                </div>
                {/* 추가 방 */}
                {/* <Link to="createroom" className="bg-white shadow rounded p-4 flex items-center justify-center text-gray-400">+ 방 생성</Link> */}
                <button
                  onClick={onClickButton}
                  className="bg-white shadow rounded p-4 flex items-center justify-center text-gray-400 hover:bg-gray-300"
                >
                  + 방 생성
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-200 p-4">
        <div className="container mx-auto text-center">{/* 푸터 콘텐츠 */}</div>
      </footer>
    </div>
  );
}
