import axios from 'axios';
import { useEffect, useState } from 'react';
import useFirstStore from '../../../stores/FirstStore';
import TestTable from '../../../components/TestTable';

export default function TestList() {
  const APIURL = 'https://i11c201.p.ssafy.io:8443/api/v1/';
  const Token = localStorage.getItem('Token');
  const [userProblem, setUserProblem] = useState([]);
  const { getIconById, toggleSave } = useFirstStore();
  const saved = useFirstStore((state) => state.saved);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios
      .get(`${APIURL}coding-test-problems/scrap`, {
        params: { page: 0, size: 10 },
        headers: { Authorization: `Bearer ${Token}` },
      })
      .then((res) => {
        console.log(res.data.response.problemInfos)
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
    <TestTable
      problems={userProblem}
      toggleSave={toggleSave}
      getIconById={getIconById}
      saved={saved}
      handleSortOrder={handleSortOrder}
      sortOrder={sortOrder}
    />
  );
}
