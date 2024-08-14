import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import useAuthStore from '../../../stores/AuthStore';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Chart() {
  const chartType = useAuthStore((state) => state.chartType);
  const [allTotalScore, setAllTotalScore] = useState(null);
  const [allPronScore, setAllPronScore] = useState(null);
  const [userTotalScore, setUserTotalScore] = useState([]);
  const [userExpressionScore, setUserExpressionScore] = useState({});

  const APIURL = "https://i11c201.p.ssafy.io:8443/api/v1/reports/";
  const Token = localStorage.getItem("Token");

  useEffect(() => {
    const fetchData = () => {
      const fetchAllScores = axios.get(`${APIURL}statistics-all-score`, {
        params: { roomType: chartType },
        headers: { Authorization: `Bearer ${Token}` },
      });

      const fetchUserScores = axios.get(`${APIURL}statistics-score`, {
        params: { roomType: chartType },
        headers: { Authorization: `Bearer ${Token}` },
      });

      const fetchUserExpressions = axios.get(`${APIURL}statistics-expression`, {
        params: { roomType: chartType },
        headers: { Authorization: `Bearer ${Token}` },
      });

      Promise.all([fetchAllScores, fetchUserScores, fetchUserExpressions])
        .then(([allScoreRes, userScoreRes, userExpressionRes]) => {
          setAllTotalScore(allScoreRes.data.response.allTotalScore);
          setAllPronScore(allScoreRes.data.response.allPronunciationScore);
          setUserTotalScore(userScoreRes.data.response.scores);
          setUserExpressionScore(userExpressionRes.data.response.expressions);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (chartType) {
      fetchData();
    }
  }, [APIURL, Token, chartType]);

  const totalScoreData = {
    labels: ['전체 사용자', ...userTotalScore.map(score => score.title)],
    datasets: [
      {
        label: '평가 점수',
        data: [Math.round(allTotalScore), ...userTotalScore.map(score => Math.round(score.totalScore))],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          ...Array(userTotalScore.length).fill('rgba(54, 162, 235, 0.2)')
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          ...Array(userTotalScore.length).fill('rgba(54, 162, 235, 1)')
        ],
        borderWidth: 1,
      },
    ],
  };

  const pronScoreData = {
    labels: ['전체 사용자', ...userTotalScore.map(score => score.title)],
    datasets: [
      {
        label: '발음 점수',
        data: [Math.round(allPronScore), ...userTotalScore.map(score => Math.round(score.pronunciationScore))],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          ...Array(userTotalScore.length).fill('rgba(75, 192, 192, 0.2)')
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          ...Array(userTotalScore.length).fill('rgba(75, 192, 192, 1)')
        ],
        borderWidth: 1,
      },
    ],
  };

  const expressionLabels = Object.keys(userExpressionScore);
  const expressionValues = Object.values(userExpressionScore);
  const totalExpressionValue = expressionValues.reduce((acc, value) => acc + value, 0);
  const otherValue = 1 - totalExpressionValue;

  const percentageValues = expressionValues.map(value => (value * 100).toFixed(0));
  const percentageOtherValue = (otherValue * 100).toFixed(0);
  const pieData = {
    labels: [],
    datasets: [
      {
        data: [...percentageValues, percentageOtherValue],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            const value = tooltipItem.raw;
            return ` ${value}점`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return Math.round(value);
          }
        }
      },
    },
  };

  const pronScoreOptions = {
    ...barOptions,
    plugins: {
      ...barOptions.plugins,
      title: {
        display: true,
        text: '발음 점수',
        align: 'center',
      },
    },
    scales: {
      ...barOptions.scales,
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          callback: function(value) {
            return Math.round(value);
          }
        }
      },
    },
  };

  const pieOptions = {
    ...barOptions,
    plugins: {
      ...barOptions.plugins,
      title: {
        display: true,
        text: '표정 점수',
        align: 'center',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            const value = tooltipItem.raw;
            return ` ${value}%`; // % 표시 추가
          }
        }
      }
    },
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex flex-row justify-between gap-4 w-full">
        <div className="w-full h-64 lg:w-1/2">
          <Bar data={totalScoreData} options={{ ...barOptions, plugins: { ...barOptions.plugins, title: { display: true, text: '평가 점수' } } }} />
        </div>
        <div className="w-full h-64 lg:w-1/2">
          <Bar data={pronScoreData} options={pronScoreOptions} />
        </div>
      </div>
      <div className="w-full h-80 lg:w-1/2 mx-auto pl-20">
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
}
