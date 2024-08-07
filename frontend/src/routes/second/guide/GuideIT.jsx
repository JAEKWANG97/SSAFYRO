import { useEffect, useState } from "react";
import SecondNav from "../components/SecondNav.jsx";
import GuideNav from "./components/GuideNav.jsx";
import axios from "axios";

export default function GuideIT() {
  const [itKnowledgeInfos, setItKnowledgeInfos] = useState([]); // 초기 상태를 빈 배열로 설정
  const APIURL = 'http://i11c201.p.ssafy.io:9999/api/v1/';
  
  console.log(itKnowledgeInfos);
  
  useEffect(() => {
    axios
      .get(`${APIURL}it-knowledge`, {
        params: {
          page: 0,
          size: 200,
        },
      })
      .then((response) => {
        // Assuming response.data.response.itKnowledgeInfos is an array
        setItKnowledgeInfos(response.data.response.itKnowledgeInfos);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <SecondNav />
      <GuideNav />
      <div
        className="container mx-auto p-5 max-w-4xl bg-white rounded-lg shadow-md mt-10 mb-20"
        style={{
          boxShadow:
            '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        {itKnowledgeInfos.map((info, index) => (
          <div key={index} className="border-b border-gray-200 py-4">
            <div onClick={() => window.location.href = info.articleUrl}> {/* Corrected here */}
              <img src={info.thumbnailImageUrl} alt="thumbnail" className="w-full h-auto" />
              <h2 className="text-lg font-semibold mt-2">{info.title}</h2>
              <p className="text-sm text-gray-600">{info.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
