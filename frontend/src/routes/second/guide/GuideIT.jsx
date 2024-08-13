import { useEffect, useState } from "react";
import SecondNav from "../components/SecondNav.jsx";
import GuideNav from "./components/GuideNav.jsx";
import axios from "axios";

export default function GuideIT() {
  const [itKnowledgeInfos, setItKnowledgeInfos] = useState([]); // 초기 상태를 빈 배열로 설정
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const itemsPerPage = 6; // 페이지당 항목 수
  const maxItems = 60; // 최대 항목 수
  const APIURL = 'https://i11c201.p.ssafy.io:8443/api/v1/';
  
  useEffect(() => {
    axios
      .get(`${APIURL}it-knowledge`, {
        params: {
          page: 0,
          size: 200, 
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
      }
        
      })
      .then((response) => {
        // 최대 60개의 기사만 저장
        setItKnowledgeInfos(response.data.response.itKnowledgeInfos.slice(0, maxItems));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 현재 페이지에 해당하는 데이터 슬라이싱
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itKnowledgeInfos.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(itKnowledgeInfos.length / itemsPerPage);

  return (
    <>
      <SecondNav />
      <GuideNav />
      <div
        className="container mx-auto p-5 max-w-4xl bg-white rounded-lg shadow-md mt-10 mb-20"
        style={{
          boxShadow:
            '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentItems.map((info, index) => (
            <div key={index} className="border-b border-gray-200 py-4 cursor-pointer transition-transform duration-300 hover:scale-105">
              <div onClick={() => window.location.href = info.articleUrl}>
                <img src={info.thumbnailImageUrl} alt="thumbnail" className="w-full h-auto rounded-lg" />
                <h2 className="text-base text-center font-semibold mt-4">{info.title}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <nav
          aria-label="Page navigation example"
          className="flex justify-center mt-4" // 페이지네이션을 가운데 정렬
        >
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${
                  currentPage === 1 ? "text-gray-300 cursor-not-allowed" : ""
                }`}
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    currentPage === index + 1
                      ? "text-blue-600 border border-blue-300 bg-blue-50"
                      : "text-gray-500 bg-white border border-gray-300"
                  } hover:bg-gray-100 hover:text-gray-700`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${
                  currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : ""
                }`}
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
