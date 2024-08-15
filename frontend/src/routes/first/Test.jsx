import { useState, useEffect } from "react";
import FirstdNav from "./components/FirstNav";
import Ismajor from "./../../components/Ismajor";
import useFirstStore from "../../stores/FirstStore";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TestTable from "../../components/TestTable";

export default function Test() {
  const [allProblems, setAllProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const { getIconById, saved, toggleSave, selected, setSelected } =
    useFirstStore();
  const APIURL = "https://i11c201.p.ssafy.io:8443/api/v1/";
  const Token = localStorage.getItem("Token");
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axios
      .get(`${APIURL}coding-test-problems`, {
        params: { page: 0, size: 389 },
        headers: { Authorization: `Bearer ${Token}` },
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

  useEffect(() => {
    let filteredData = [];
    if (selected === "major") {
      const d3Problems = allProblems
        .filter((item) => item.difficulty === "D3")
        .slice(0, 25);
      const d4Problems = allProblems
        .filter((item) => item.difficulty === "D4")
        .slice(0, 25);
      filteredData = [...d3Problems, ...d4Problems];
    } else {
      filteredData = allProblems.filter(
        (item) => item.difficulty === "D1" || item.difficulty === "D2"
      );
    }
    setFilteredProblems(filteredData);
    setPage(1);
  }, [selected, allProblems]);

  const getCurrentPageProblems = () => {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    return filteredProblems.slice(startIndex, endIndex);
  };

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
      <div className="container mx-auto p-5 max-w-4xl bg-white rounded-lg shadow-md mt-10 mb-20 overflow-hidden">
        <div className="flex pb-10 items-center pt-4">
          <p className="text-2xl font-extrabold pr-4 pl-2">SW 적성진단</p>
          <Ismajor setSelected={setSelected} />
        </div>
        <TestTable
          problems={getCurrentPageProblems()}
          toggleSave={toggleSave}
          getIconById={getIconById}
          saved={saved}
          handleSortOrder={toggleSortOrder}
          sortOrder={sortOrder}
        />
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
