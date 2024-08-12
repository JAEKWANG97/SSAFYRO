import React from "react";

function SearchAndFilter({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
}) {
  return (
    <div className="mb-6 p-5 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="검색어 입력"
            value={searchTerm}
            onChange={onSearchChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-150 ease-in-out"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={filter}
            onChange={onFilterChange}
            className="p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-150 ease-in-out"
          >
            <option value="all">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="best">Best</option>
            <option value="worst">Worst</option>
          </select>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-150 ease-in-out">
            검색
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchAndFilter;
