import axios from "axios";


const APIURL = "https://i11c201.p.ssafy.io:8443/api/v1/";

let userId = null;

if(localStorage.getItem('userInfo')){
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  userId = userInfo.userId
}


const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` }
});

export const getUserInfo = async () => {
  const response = await axios.get(`${APIURL}users`, getAuthHeader());
  return response.data.response;
};

export const getInterviewInfo = async (page = 0, size = 10) => {
  const response = await axios.get(`${APIURL}reports`, {
    params: { userId, page, size },
    ...getAuthHeader()
  });

  return response.data.response.reports;
};

export const getEssayData = async (userId) => {
  const response = await axios.get(`${APIURL}essays`, {
    params: { userId },
    ...getAuthHeader()
  });
  return response.data.response.content;
};

export const initUserType = async (type) => {
   await axios.post(`${APIURL}users/init`,
     type,
     getAuthHeader());
} 
