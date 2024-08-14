import axios from "axios";
import { useEffect, useState } from "react"; 
import useFirstStore from "../../../stores/FirstStore";

export default function TestList() {

  const APIURL = 'https://i11c201.p.ssafy.io:8443/api/v1/'; 
  const Token = localStorage.getItem('Token');
  const [userProblem, setUserProblem] = useState([]);
  const { getIconById, toggleSave } = useFirstStore();
  const saved = useFirstStore((state) => state.saved);
  const setSaved = useFirstStore((state) => state.setSaved);

  console.log(saved)

  useEffect(()=>{
    axios
    .get(`${APIURL}coding-test-problems/scrap`, 
      {params: {
          page: 0,
          size: 10,
        },
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res)=>{
        console.log(res.data.response.problemInfos);
        setUserProblem(res.data.response.problemInfos);
      });
  },[saved]);

  return (
    <>
        <div className="overflow-hidden h-full">
          <table className="w-full table-fixed text-sm text-left text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-gray-200 border-b">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-center cursor-pointer "
                >
                  난이도
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-center w-56 overflow-hidden"
                >
                  문제 이름
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-center overflow-hidden"
                  style={{ whiteSpace: 'nowrap' }} // 한 줄로 유지
                >
                  정답률
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-center overflow-hidden"
                >
                  추천수
                </th>
                
                <th
                  scope="col"
                  className="px-2 py-3 text-center overflow-hidden"
                >
                  저장
                </th>
              </tr>
            </thead>
            <tbody>
              {userProblem.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b-2"
                >
                  <td className="px-4 py-4 text-gray-900 whitespace-nowrap text-center flex items-center justify-center">
                    <div className="flex items-center justify-center">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {getIconById(item.difficulty)?.component}
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-4 text-center text-base overflow-hidden">
                    <a href={item.problemUrl} className="overflow-hidden">
                      {item.title}
                    </a>
                  </td>
                  <td className="px-2 py-4 text-center text-base" style={{ whiteSpace: 'nowrap' }}>
                    {item.correctRate}%
                  </td>
                  <td className="px-2 py-4 text-center text-base">
                  {item.recommendationCount}
                  </td>
                  <td className="px-2 py-4 text-center text-base">
                    <button onClick={() => toggleSave(item.id)}>
                      {saved[item.id] ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                          />
                        </svg>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
</>
  );
}
