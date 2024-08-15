import axios from "axios";

const APIURL = "https://i11c201.p.ssafy.io:8443/api/v1/";

let userInfo = null;
let token = null;
let userId = null;

if (localStorage.getItem("userInfo")) {
  userInfo = JSON.parse(localStorage.getItem("userInfo"));
  token = localStorage.getItem("Token");
  userId = userInfo.userId;
  console.log(userId);
}

export const EssayApi = {
  getUserInfo: async (token) => {
    const response = await axios.get(`${APIURL}users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.response;
  },

  getEssayQuestion: async (token, type, generation) => {
    const response = await axios.get(`${APIURL}essay-questions`, {
      params: { type, generation },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.response;
  },

  getEssay: async () => {
    const response = await axios.get(`${APIURL}essays`, {
      params: { userId },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.response;
  },

  saveEssay: async (token, essayData) => {
    const response = await axios
      .post(`${APIURL}essays`, essayData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
      });
    return response.data;
  },

  updateEssay: async (token, essayData) => {
    const response = await axios.put(`${APIURL}essays`, essayData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
