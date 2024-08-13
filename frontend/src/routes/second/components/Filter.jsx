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
      <div className="mb-4 mr-4">
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
      <div className="mb-4 mr-4">
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
      <div className="mb-4 mr-4" style={{ width: "200px" }}>
        {/* 검색어 입력 */}
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="w-full border p-3 rounded-lg"
          value={filter.title}
          onChange={(e) => setFilter({ ...filter, title: e.target.value })}
        />
      </div>
      <div className="flex items-center mb-4 mr-4">
        {/* 모집중 체크박스 */}
        <label className="flex items-center text-gray-500">
          <input
            type="checkbox"
            className="mr-2"
            checked={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.checked })}
          />
          모집중
        </label>
      </div>
      <div className="ml-auto">
        {/* <button
          className="bg-blue-600 text-white p-2 rounded-lg mb-4"
          onClick={() => onSearchClick(filter)}
        >
          검색하기
        </button> */}
        <Button type="SEARCHROOM" text="검색하기" onClick={() => onSearchClick(filter)}/>
        {/* <Button 
        text="검색하기" type="SEARCHROOM" onClick={() => onSearchClick(filter)}/> */}
        {/* <button className="bg-blue-300 p-3 mr-2 mb-4 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 512 512"
          >
            <path
              fill="white"
              d="M456.69 421.39L362.6 327.3a173.8 173.8 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.8 173.8 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3M97.92 222.72a124.8 124.8 0 1 1 124.8 124.8a124.95 124.95 0 0 1-124.8-124.8"
            ></path>
          </svg>
        </button> */}
      </div>
    </div>
  );
}
