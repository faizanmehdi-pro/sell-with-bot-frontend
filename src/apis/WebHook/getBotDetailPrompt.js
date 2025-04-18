import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL,
});

export const getBotDetails = async (improvedLayout) => {
  const userToken = localStorage.getItem("authToken");
  if (!userToken) throw new Error("User token not found");

  const API_KEY = `token ${userToken}`;

  const response = await api.get(`/api/UpdateBot/?improved_layout=${improvedLayout}`, {
    headers: {
      Authorization: API_KEY,
    },
  });

  return response.data;
};
