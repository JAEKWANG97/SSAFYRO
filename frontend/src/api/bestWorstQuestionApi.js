import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getBestWorstQuestion = async (
  page,
  size,
  sort = "evaluationScore,asc"
) => {
  console.log(`${BASE_URL}/api/v1/interview-result/user/best`);
  const response = await axios.get(
    `${BASE_URL}/api/v1/interview-result/user/best?page=${page}&size=${size}&sort=${sort}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

export const getBestWorstQuestionByUser = async (page, size, sort) => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/interview-result/user?page=${page}&size=${size}&sort=${sort}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};
