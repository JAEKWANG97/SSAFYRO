import { useState } from "react";
import FirstdNav from "./components/FirstNav";
import Ismajor from "./../../components/Ismajor";
import useFirstStore from "../../stores/FirstStore";

export default function Test() {
  const { getIconById } = useFirstStore();
  const selected = useFirstStore((state) => state.selected);
  const setSelected = useFirstStore((state) => state.setSelected);

  // 전공자 데이터
  const [majorData, setMajorData] = useState([
    { id: 1, iconId: 1, name: "고대 문명 유적 탐사", check: false,},
    { id: 2, iconId: 2, name: "마법의 숲 탐색", check: false },
    { id: 3, iconId: 3, name: "루폴프의 반란", check: false },
    { id: 4, iconId: 4, name: "색깔 트리", check: false },
    { id: 5, iconId: 1, name: "고대 문명 유적 탐사",check: false,},
    { id: 6, iconId: 2, name: "마법의 숲 탐색", check: false },
    { id: 7, iconId: 3, name: "루폴프의 반란", check: false },
    { id: 8, iconId: 4, name: "색깔 트리", check: false },
  ]);

  // 비전공자 데이터
  const [nonMajorData, setNonMajorData] = useState([
    { id: 1, iconId: 1, name: "문제5", check: false },
    { id: 2, iconId: 2, name: "문제6", check: false },
    { id: 3, iconId: 3, name: "문제7", check: false },
    { id: 4, iconId: 4, name: "문제8", check: false },
  ]);

  const [sortOrder, setSortOrder] = useState("asc");

  const tableData = selected === "major" ? majorData : nonMajorData;

  // 체크박스 상태 업데이트 함수
  const handleCheckboxChange = (id) => {
    if (selected === "major") {
      const updatedData = majorData.map((item) =>
        item.id === id ? { ...item, check: !item.check } : item
      );
      setMajorData(updatedData);
    } else {
      const updatedData = nonMajorData.map((item) =>
        item.id === id ? { ...item, check: !item.check } : item
      );
      setNonMajorData(updatedData);
    }
  };

  // 데이터 정렬 함수
  const sortData = () => {
    const sortedData = [...tableData].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.iconId - b.iconId; // 오름차순 정렬
      } else {
        return b.iconId - a.iconId; // 내림차순 정렬
      }
    });

    // 정렬된 데이터를 상태로 설정
    if (selected === "major") {
      setMajorData(sortedData);
    } else {
      setNonMajorData(sortedData);
    }
  };

  // 정렬 상태를 토글하고 데이터 정렬 실행
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    sortData(); // 데이터 정렬 실행
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
                  레벨{sortOrder === "asc" ? "↓" : "↑"}
                </th>
                <th scope="col" className="px-2 py-3 text-center">
                  문항 이름
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  출처
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  저장
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b-2 hover:bg-gray-100 hover:text-blue-400 hover:font-bold"
                >
                  <td className="px-4 py-4 text-gray-900 whitespace-nowrap text-center flex items-center justify-center">
                    <div className="flex items-center justify-center">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {getIconById(item.iconId)?.component}
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-4 text-center text-base">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-center text-base">
                    SW Expert Academy
                  </td>
                  <td className="px-6 py-4 text-center text-base">
                    <input
                      type="checkbox"
                      checked={item.check}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="form-checkbox"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
