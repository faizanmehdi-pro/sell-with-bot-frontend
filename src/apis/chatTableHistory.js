import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL,
});

export const chatTableHistory = async () => {
  const userToken = localStorage.getItem("authToken");
  if (!userToken) throw new Error("User token not found");

  const API_KEY = `token ${userToken}`;

  const response = await api.get(`/api/chat-history/`, {
    headers: {
      Authorization: API_KEY,
    },
  });

  return response.data;
};
