import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

export const fetchQuestionFeedbacks = async (
  page = 1,
  filter = "newest",
  searchTerm = ""
) => {
  try {
    const response = await axios.get(`${BASE_URL}/question-feedbacks`, {
      params: {
        page: 1,
        size: 10,
        filter,
        search: searchTerm,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching question feedbacks:", error);
    throw error;
  }
};

export const fetchQuestionFeedbackDetail = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/question-feedbacks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching question feedback detail:", error);
    throw error;
  }
};

export const fetchQuestionFeedbackByQuestionId = async (questionId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/question-feedback/${questionId}`,
      {
        params: {
          page: 1,
          size: 10,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching question feedback by question id:", error);
    throw error;
  }
};
