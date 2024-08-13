import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function PersonalityChart() {
  const [personAllTotalScore, setPersonAllTotalScore] = useState(null); // 모든 유저 인성 레포트 총점
  const [personAllPronScore, setPersonAllPronScore] = useState(null); // 모든 유저 인성 발음 점수
  const [personUserTotalScore, setPersonUserTotalScore] = useState([]); // 유저의 모든 레포트 총점
  const [personUserExpressionScore, setPersonUserExpressionScore] = useState({}); // 유저의 인성 표정 top 3

  const APIURL = "https://i11c201.p.ssafy.io:8443/api/v1/reports/";
  const Token = localStorage.getItem("Token");
  const roomType = 'PERSONALITY';

  const fetchData = (url, callback) => {
    axios.get(url, {
      params: { roomType },
      headers: { Authorization: `Bearer ${Token}` },
    })
    .then((res) => {
      const data = res.data.response;
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    fetchData(`${APIURL}statistics-all-score`, (data) => {
      setPersonAllTotalScore(data.allTotalScore);
      setPersonAllPronScore(data.allPronunciationScore);
    });
  }, [APIURL, Token, roomType]);

  useEffect(() => {
    fetchData(`${APIURL}statistics-score`, (data) => {
      setPersonUserTotalScore(data.scores);
    });
  }, [APIURL, Token, roomType]);

  useEffect(() => {
    fetchData(`${APIURL}statistics-expression`, (data) => {
      setPersonUserExpressionScore(data.expressions);
    });
  }, [APIURL, Token, roomType]);

  // Total Score 그래프 데이터
  const totalScoreData = {
    labels: ['전체 사용자', ...personUserTotalScore.map(score => score.title)],
    datasets: [
      {
        label: '전체 점수',
        data: [personAllTotalScore, ...personUserTotalScore.map(score => score.totalScore)],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', // 전체 사용자 막대 배경색: 빨간색
          ...Array(personUserTotalScore.length).fill('rgba(54, 162, 235, 0.2)') // 나머지 막대 배경색: 파란색
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // 전체 사용자 막대 경계색: 빨간색
          ...Array(personUserTotalScore.length).fill('rgba(54, 162, 235, 1)') // 나머지 막대 경계색: 파란색
        ],
        borderWidth: 1,
      },
    ],
  };

  // Pronunciation Score 그래프 데이터
  const pronScoreData = {
    labels: ['전체 사용자', ...personUserTotalScore.map(score => score.title)],
    datasets: [
      {
        label: '발음 점수',
        data: [personAllPronScore, ...personUserTotalScore.map(score => score.pronunciationScore)],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          ...Array(personUserTotalScore.length).fill('rgba(75, 192, 192, 0.2)') // 나머지 막대 배경색: 초록색
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', 
          ...Array(personUserTotalScore.length).fill('rgba(75, 192, 192, 1)') // 나머지 막대 경계색: 초록색
        ],
        borderWidth: 1,
      },
    ],
  };

  // 파이 차트 데이터
  const expressionLabels = Object.keys(personUserExpressionScore);
  const expressionValues = Object.values(personUserExpressionScore);

  const totalExpressionValue = expressionValues.reduce((acc, value) => acc + value, 0);
  const otherValue = 1 - totalExpressionValue; // 기타 값

  const pieData = {
    labels: [...expressionLabels, '기타'],
    datasets: [
      {
        data: [...expressionValues, otherValue],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)', // 기타 항목 색상
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)', // 기타 항목 경계색
        ],
        borderWidth: 1,
      },
    ],
  };

  // 그래프 옵션
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // 범례를 숨김
      },
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex flex-row justify-between gap-4 w-full">
        <div className="w-full h-64 lg:w-1/2">
          <Bar data={totalScoreData} options={{ ...options, plugins: { ...options.plugins, title: { display: true, text: 'Total Score' } } }} />
        </div>
        <div className="w-full h-64 lg:w-1/2">
          <Bar data={pronScoreData} options={{ ...options, plugins: { ...options.plugins, title: { display: true, text: 'Pronunciation Score' } } }} />
        </div>
      </div>
      <div className="w-full h-80 lg:w-1/2 mx-auto pl-20">
        <Pie data={pieData} options={{ ...options, plugins: { ...options.plugins, title: { display: true, text: 'Expression Score' } } }} />
      </div>
    </div>

  );
}