import React, { useState } from "react";

export default function Filter({onSearchClick}) {
  const [filter, setFilter] = useState({
    type: null,
    capacity: null,
    page: 1,
    size: 10,
    title: null,
    status: null,
  });
   
  return (
    <div className="mt-10 w-1/4 h-[350px] p-4 bg-white shadow rounded">
      <div className="mb-4">
        <label className="block mb-2">면접 종류 선택</label>
        <select
          className="w-full border p-2 rounded bg-gray-50"
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value === "" ? null : e.target.value })}
        >
          <option value="">전체</option>
          <option value="PERSONALITY">인성 면접</option>
          <option value="PRESENTATION">PT 면접</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">참여 인원 선택</label>
        <select
          className="w-full border p-2 rounded bg-gray-50"
          value={filter.capacity}
          onChange={(e) => setFilter({ ...filter, capacity: e.target.value === "" ? null : e.target.value })}
        >
          <option value="">전체</option>
          <option value="1">1명</option>
          <option value="2">2명</option>
          <option value="3">3명</option>
        </select>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="w-full border p-2 rounded"
          value={filter.title}
          onChange={(e) => setFilter({ ...filter, title: e.target.value === "" ? null : e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.checked ? "WAIT" : null })}
            // onChange={(e) => onFilterChange('isRecruiting', e.target.checked)}
          />
          모집중
        </label>
      </div>
      <button
        className="w-full bg-blue-600 text-white p-2 rounded"
        onClick={() => onSearchClick(filter)}
      >
        검색하기
      </button>
    </div>
  );
}
