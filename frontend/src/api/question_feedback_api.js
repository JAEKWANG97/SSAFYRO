import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

//  유저별 질문 답변 조회
// /api/v1/interview-result/user
export const fetchUserQuestionFeedbacks = async (
  page = 0,
  size = 10,
  sort = "evaluationScore"
) => {
  const response = await axios.get(`${BASE_URL}/interview-result/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data.response.interviewResultInfos;
};

// 특정 인터뷰 결과 연관 베스트 질문 답변 조회
// /api/v1/interview-result/{id}/best
export const fetchBestQuestionFeedbacks = async (id) => {
  const response = await axios.get(`${BASE_URL}/interview-result/${id}/best`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data.response.interviewResultInfos;
};

// 인터뷰 결과 목록 조회
// GET /api/v1/interview-result?query=%ED%83%9C%EA%B7%B81,%ED%83%9C%EA%B7%B82,%ED%83%9C%EA%B7%B83&sort=evaluationScore,desc HTTP/1.1
// createDate: 최신순 정렬, evaluationScore: 점수순 정렬
export const fetchInterviewResults = async (
  query,
  sort,
  page = 0,
  size = 10
) => {
  try {
    console.log(query, sort, page, size);
    console.log(`${BASE_URL}/interview-result`);
    const response = await axios.get(`${BASE_URL}/interview-result`, {
      params: {
        query: query,
        sort: sort,
        page: page,
        size: size,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    });

    if (response.data.success) {
      return response.data.response.interviewResultInfos;
    } else {
      throw new Error(
        response.data.error || "Failed to fetch interview results"
      );
    }
  } catch (error) {
    console.error("Error fetching interview results:", error);
    throw error;
  }
};
