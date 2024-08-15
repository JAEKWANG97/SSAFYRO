import axios from "axios";
import { useEffect, useState } from "react";
import SecondNav from "../components/SecondNav.jsx";
import GuideNav from "./components/GuideNav.jsx";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
          className="flex justify-center mt-4"
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </nav>
      </div>
    </>
  );
}
