import { useState, useEffect } from "react";
import FirstdNav from "./components/FirstNav";
import Ismajor from "./../../components/Ismajor";
import useFirstStore from "../../stores/FirstStore";
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Test() {
  const [allProblems, setAllProblems] = useState([]); // 전체 데이터를 저장할 상태
  const [filteredProblems, setFilteredProblems] = useState([]); // 필터링된 데이터를 저장할 상태

  const { getIconById, saved, toggleSave, selected, setSelected } = useFirstStore(); 

  const APIURL = 'https://i11c201.p.ssafy.io:8443/api/v1/'; 
  const Token = localStorage.getItem("Token");

  const [page, setPage] = useState(1); // 현재 페이지 번호 (1부터 시작)
  const [size] = useState(5); // 페이지당 항목 수
  const [sortOrder, setSortOrder] = useState("asc"); // 기본 정렬 상태를 오름차순으로 설정

  console.log(saved)
 
  // 적성진단 문제 가져오기
  useEffect(() => {
    axios
      .get(`${APIURL}coding-test-problems`, {
        params: {
          page: 0,
          size: 389,
        },
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        const sortedData = response.data.response.problemInfos.sort((a, b) =>
          a.difficulty.localeCompare(b.difficulty)
        );
        setAllProblems(sortedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 사용자 선택에 따른 데이터 필터링 및 페이지 초기화
  useEffect(() => {
    let filteredData = [];

    if (selected === "major") {
      const d3Problems = allProblems.filter(
        (item) => item.difficulty === "D3"
      ).slice(0, 25);

      const d4Problems = allProblems.filter(
        (item) => item.difficulty === "D4"
      ).slice(0, 25);

      filteredData = [...d3Problems, ...d4Problems];
    } else {
      filteredData = allProblems.filter(
        (item) => item.difficulty === "D1" || item.difficulty === "D2"
      );
    }
    setFilteredProblems(filteredData);
    setPage(1);
  }, [selected, allProblems]);

  // 페이지에 따른 데이터를 설정하는 함수
  const getCurrentPageProblems = () => {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    return filteredProblems.slice(startIndex, endIndex);
  };

  // 정렬 함수
  const sortData = (order) => {
    const sortedData = [...filteredProblems].sort((a, b) => {
      if (order === "asc") {
        return a.difficulty.localeCompare(b.difficulty);
      } else {
        return b.difficulty.localeCompare(a.difficulty);
      }
    });
    setFilteredProblems(sortedData);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    sortData(newOrder);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <FirstdNav />
      <div
        className="container mx-auto p-5 max-w-4xl bg-white rounded-lg shadow-md mt-10 mb-20 overflow-hidden"
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 -4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex pb-10 items-center pt-4">
          <p className="text-2xl font-extrabold pr-4 pl-2">SW 적성진단</p>
          <Ismajor setSelected={setSelected} />
        </div>

        <div className="overflow-hidden h-full">
          <table className="w-full table-fixed text-sm text-left text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-gray-200 border-b">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-center cursor-pointer "
                  onClick={toggleSortOrder}
                >
                  난이도{sortOrder === "asc" ? "↓" : "↑"}
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-center w-56 overflow-hidden"
                >
                  문제 이름
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 pl-20 text-center overflow-hidden"
                >
                  정답률
                </th>
                {/* <th
                  scope="col"
                  className="px-2 py-3 pl-20 text-center overflow-hidden" // 추천수 열을 오른쪽으로 이동
                >
                  추천수
                </th> */}
                <th
                  scope="col"
                  className="px-2 py-3 text-center overflow-hidden"
                >
                  저장
                </th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageProblems().map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b-2"
                >
                  <td className="px-4 py-4 text-gray-900 whitespace-nowrap text-center flex items-center justify-center">
                    <div className="flex items-center justify-center">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {getIconById(item.difficulty)?.component}
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-4 text-center text-base overflow-hidden">
                    <a href={item.problemUrl} className="overflow-hidden">
                      {item.title}
                    </a>
                  </td>
                  <td className="px-2 py-4 pl-20 text-center text-base">
                    {item.correctRate}%
                  </td>
                  {/* <td className="px-8 py-4 pl-20 text-center text-base"> 
                    {item.recommendationCount}
                  </td> */}
                  <td className="px-2 py-4 text-center text-base">
                    <button onClick={() => toggleSave(item.id)}>
                      {saved[item.id] ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                          />
                        </svg>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <nav
          aria-label="Page navigation example"
          className="flex justify-center mt-4"
        >
          <Pagination
            count={Math.ceil(filteredProblems.length / size)}
            page={page}
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
