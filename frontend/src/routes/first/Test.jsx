import { useState, useEffect } from "react";
import FirstdNav from "./components/FirstNav";
import Ismajor from "./../../components/Ismajor";
import useFirstStore from "../../stores/FirstStore";
import axios from "axios";

export default function Test() {
  const { getIconById } = useFirstStore();
  const selected = useFirstStore((state) => state.selected); // 전공자 비전공자 선택 유무
  const setSelected = useFirstStore((state) => state.setSelected);

  const [allProblems, setAllProblems] = useState([]); // 전체 데이터를 저장할 상태
  const [filteredProblems, setFilteredProblems] = useState([]); // 필터링된 데이터를 저장할 상태

  const APIURL = "http://i11c201.p.ssafy.io:9999/api/v1/";

  const [page, setPage] = useState(1); // 현재 페이지 번호 (1부터 시작)
  const [size] = useState(10); // 페이지당 항목 수

  const [sortOrder, setSortOrder] = useState("asc"); // 기본 정렬 상태를 오름차순으로 설정

  // 적성진단 문제 가져오기
  useEffect(() => {
    axios
      .get(`${APIURL}coding-test-problems`, {
        params: {
          page: 0,
          size: 389,
        },
      })
      .then((response) => {
        console.log(response.data);

        // 데이터를 오름차순으로 정렬하여 설정
        const sortedData = response.data.response.problemInfos.sort((a, b) =>
          a.difficulty.localeCompare(b.difficulty)
        );

        setAllProblems(sortedData); // 정렬된 전체 데이터를 상태에 설정
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 사용자 선택에 따른 데이터 필터링 및 페이지 초기화
  useEffect(() => {
    let filteredData = [];

    if (selected === "major") {
      // 난이도가 D3, D4인 데이터 각각 25개씩 필터링
      const d3Problems = allProblems.filter(
        (item) => item.difficulty === "D3"
      ).slice(0, 25);

      const d4Problems = allProblems.filter(
        (item) => item.difficulty === "D4"
      ).slice(0, 25);

      filteredData = [...d3Problems, ...d4Problems]; // D3과 D4 문제 합침
    } else {
      // 난이도가 D1~D2인 데이터 필터링
      filteredData = allProblems.filter(
        (item) => item.difficulty === "D1" || item.difficulty === "D2"
      );
    }
    setFilteredProblems(filteredData); // 필터링된 데이터로 상태 업데이트
    setPage(1); // 선택이 변경될 때마다 페이지를 1로 초기화
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
        return a.difficulty.localeCompare(b.difficulty); // 난이도 기준 오름차순 정렬
      } else {
        return b.difficulty.localeCompare(a.difficulty); // 난이도 기준 내림차순 정렬
      }
    });
    setFilteredProblems(sortedData); // 정렬된 데이터로 상태 업데이트
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    sortData(newOrder); // 새로운 정렬 상태에 따라 데이터 정렬 실행
  };

  // 페이지 변경 함수
  const changePage = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(filteredProblems.length / size)) {
      setPage(newPage);
    }
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
                  className="px-2 py-3 text-center overflow-hidden"
                >
                  정답률
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-center overflow-hidden"
                >
                  추천수
                </th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageProblems().map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b-2 hover:bg-gray-100 hover:text-blue-400 hover:font-bold"
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
                  <td className="px-2 py-4 text-center text-base">
                    {item.correctRate}
                  </td>
                  <td className="px-2 py-4 text-center text-base">
                  {item.recommendationCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <nav
          aria-label="Page navigation example"
          className="flex justify-center mt-4" // 페이지네이션을 가운데 정렬
        >
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <button
                onClick={() => changePage(page - 1)}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
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
            {Array.from(
              { length: Math.ceil(filteredProblems.length / size) },
              (_, index) => (
                <li key={index + 1}>
                  <button
                    onClick={() => changePage(index + 1)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight ${
                      page === index + 1
                        ? "text-blue-600 border border-blue-300 bg-blue-50"
                        : "text-gray-500 bg-white border border-gray-300"
                    } hover:bg-gray-100 hover:text-gray-700`}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
            <li>
              <button
                onClick={() => changePage(page + 1)}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
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
