import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFirstStore from '../../../stores/FirstStore';
import TestTable from '../../../components/TestTable';

export default function TestList() {
  const APIURL = 'https://i11c201.p.ssafy.io:8443/api/v1/';
  const Token = localStorage.getItem('Token');
  const [userProblem, setUserProblem] = useState([]);
  const { getIconById, toggleSave } = useFirstStore();
  const saved = useFirstStore((state) => state.saved);
  const [sortOrder, setSortOrder] = useState('asc');
  const nav = useNavigate()

  useEffect(() => {
    axios
      .get(`${APIURL}coding-test-problems/scrap`, {
        params: { page: 0, size: 10 },
        headers: { Authorization: `Bearer ${Token}` },
      })
      .then((res) => {
        console.log(res.data.response.problemInfos);
        setUserProblem(res.data.response.problemInfos);
      });
  }, [saved]);

  const handleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);

    const sortedData = [...userProblem].sort((a, b) => {
      if (newOrder === 'asc') {
        return a.difficulty.localeCompare(b.difficulty);
      } else {
        return b.difficulty.localeCompare(a.difficulty);
      }
    });

    setUserProblem(sortedData);
  };

  return (
    <>
      {saved && Object.keys(saved).length > 0 ? (
        <TestTable
          problems={userProblem}
          toggleSave={toggleSave}
          getIconById={getIconById}
          saved={saved}
          handleSortOrder={handleSortOrder}
          sortOrder={sortOrder}
        />
      ) : (
        <div className="flex items-center justify-center pt-7">
              <div
              className="w-[500px] h-[200px] rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer transition-shadow hover:shadow-lg"
              style={{ backgroundColor:"rgba(240, 240, 240, 0.8)"  }}
              onClick={()=>{nav('/first/test')}}
            >
              <span className="text-xl text-gray-500 font-semibold text-center pb-1"> SW 적성진단</span>
              <div className="flex items-center gap-2">
                <span className="text-xl text-gray-500 font-semibold text-center">준비하러 가기</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
              </div>
            </div>
          </div>
      )}
    </>
  );
}
