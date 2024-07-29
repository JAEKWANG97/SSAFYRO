// Filter.jsx

import React from "react";

export default function Filter({
  filter,
  onFilterChange,
  onSearchClick,
}) {
  return (
    <div className="mt-10 w-1/4 h-[350px] p-4 bg-white shadow rounded">
      <div className="mb-4">
        <label className="block mb-2">면접 종류 선택</label>
        <select
          className="w-full border p-2 rounded bg-gray-50"
          value={filter.selectedType}
          onChange={(e) => onFilterChange('selectedType', e.target.value)}
        >
          <option value="">전체</option>
          <option value="Personality">인성 면접</option>
          <option value="PT">PT 면접</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">참여 인원 선택</label>
        <select
          className="w-full border p-2 rounded bg-gray-50"
          value={filter.selectedParticipants}
          onChange={(e) => onFilterChange('selectedParticipants', e.target.value)}
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
          value={filter.searchTerm}
          onChange={(e) => onFilterChange('searchTerm', e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={filter.isRecruiting}
            onChange={(e) => onFilterChange('isRecruiting', e.target.checked)}
          />
          모집중
        </label>
      </div>
      <button
        className="w-full bg-blue-600 text-white p-2 rounded"
        onClick={onSearchClick}
      >
        검색하기
      </button>
    </div>
  );
}
