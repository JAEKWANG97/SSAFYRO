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
  const [noneAllProblems, setNoneAllProblems] = useState([]); // non-major 전체 데이터

  const APIURL = "http://i11c201.p.ssafy.io:9999/api/v1/";

  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [size, setSize] = useState(10); // 페이지당 항목 수

  const [sortOrder, setSortOrder] = useState("asc"); // 기본 정렬 상태를 오름차순으로 설정

  // 적성진단 문제 가져오기
  useEffect(() => {
    axios
      .get(`${APIURL}coding-test-problems`, {
        params: {
          page: 1, // 한 번에 모든 데이터를 가져오기 위해 페이지 번호를 1로 설정
          size: 50, // 50문제를 가져오기 위해 충분한 크기로 설정
        },
      })
      .then((response) => {
        // 데이터를 오름차순으로 정렬하여 설정
        const sortedData = response.data.response.problemInfos.sort((a, b) =>
          a.difficulty.localeCompare(b.difficulty)
        );

        setAllProblems(sortedData); // 정렬된 전체 데이터를 상태에 설정

        // 난이도가 D1~D2인 데이터 필터링
        const filteredProblem = sortedData.filter(
          (item) => item.difficulty >= "D1" && item.difficulty <= "D2"
        );

        setNoneAllProblems(filteredProblem); // 필터링된 전체 데이터를 상태에 설정
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 페이지에 따른 데이터를 설정하는 함수
  const getCurrentPageProblems = () => {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    return selected === "major"
      ? allProblems.slice(startIndex, endIndex)
      : noneAllProblems.slice(startIndex, endIndex);
  };

  // 정렬 함수
  const sortData = (order) => {
    const sortedData = [...allProblems].sort((a, b) => {
      if (order === "asc") {
        return a.difficulty.localeCompare(b.difficulty); // 난이도 기준 오름차순 정렬
      } else {
        return b.difficulty.localeCompare(a.difficulty); // 난이도 기준 내림차순 정렬
      }
    });
    setAllProblems(sortedData); // 정렬된 전체 데이터로 상태 업데이트

    const noneSortedData = [...noneAllProblems].sort((a, b) => {
      if (order === "asc") {
        return a.difficulty.localeCompare(b.difficulty); // 난이도 기준 오름차순 정렬
      } else {
        return b.difficulty.localeCompare(a.difficulty); // 난이도 기준 내림차순 정렬
      }
    });
    setNoneAllProblems(noneSortedData); // 정렬된 non-major 데이터로 상태 업데이트
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    sortData(newOrder); // 새로운 정렬 상태에 따라 데이터 정렬 실행
  };

  // 페이지 변경 함수
  const changePage = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <FirstdNav />
      <div
        className="container mx-auto p-5 max-w-4xl bg-white rounded-lg shadow-md mt-10 mb-20"
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 -4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex pb-10 items-center pt-4">
          <p className="text-2xl font-extrabold pr-4 pl-2">SW 적성진단</p>
          <Ismajor setSelected={setSelected} />
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-gray-200 border-b">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-center cursor-pointer"
                  onClick={toggleSortOrder}
                >
                  난이도{sortOrder === "asc" ? "↓" : "↑"}
                </th>
                <th scope="col" className="px-2 py-3 text-center">
                  문제 이름
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  정답률
                </th>
                <th scope="col" className="px-6 py-3 text-center">
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
                  <td className="px-2 py-4 text-center text-base">
                    <a href={item.problemUrl}>{item.title}</a>
                  </td>
                  <td className="px-6 py-4 text-center text-base">정답률</td>
                  <td className="px-6 py-4 text-center text-base">추천수</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => changePage(page > 1 ? page - 1 : page)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={page === 1}
          >
            이전
          </button>
          <p>페이지 {page}</p>
          <button
            onClick={() => changePage(page + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={
              (selected === "major" &&
                page >= Math.ceil(allProblems.length / size)) ||
              (selected === "nonMajor" &&
                page >= Math.ceil(noneAllProblems.length / size))
            }
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
}
