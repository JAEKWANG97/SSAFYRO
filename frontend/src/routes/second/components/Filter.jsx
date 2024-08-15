import React, { useState } from "react";
import Button from "../../../components/Button";

export default function Filter({ onSearchClick }) {
  const [filter, setFilter] = useState({
    type: "",
    capacity: "",
    page: 1,
    size: 10,
    title: "",
    status: "",
  });

  return (
    <div className="flex mt-3 p-4 items-end">
      {/* 필터 요소들을 가운데 정렬하기 위한 컨테이너 */}
      <div className="flex justify-center flex-grow space-x-4">
        <div className="mb-4">
          {/* 면접 종류 선택 */}
          <select
            className="border p-3 rounded-lg w-24 text-gray-400"
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          >
            <option value="">종류</option>
            <option value="PERSONALITY">인성 면접</option>
            <option value="PRESENTATION">PT 면접</option>
          </select>
        </div>
        <div className="mb-4">
          {/* 참여 인원 선택 */}
          <select
            className="border p-3 rounded-lg w-24 text-gray-400"
            value={filter.capacity}
            onChange={(e) => setFilter({ ...filter, capacity: e.target.value })}
          >
            <option value="">인원</option>
            <option value="1">1명</option>
            <option value="2">2명</option>
            <option value="3">3명</option>
          </select>
        </div>
        <div className="mb-4" style={{ width: "200px" }}>
          {/* 검색어 입력 */}
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="w-full border p-3 rounded-lg"
            value={filter.title}
            onChange={(e) => setFilter({ ...filter, title: e.target.value })}
          />
        </div>
        <div className="flex items-center mb-4">
          {/* 모집중 체크박스 */}
          <label className="flex items-center text-gray-500">
            <input
              type="checkbox"
              className="mr-2"
              checked={filter.status}
              onChange={(e) =>
                setFilter({ ...filter, status: e.target.checked })
              }
            />
            모집중
          </label>
        </div>
        <div style={{ marginLeft: "40px" }}> {/* ml-4 클래스를 적용하여 버튼을 살짝 오른쪽으로 이동 */}
          <Button
            type="SEARCHROOM"
            text="검색하기"
            onClick={() => onSearchClick(filter)}
          />
        </div>
      </div>
    </div>
  );
}
