import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
});

export const switchToAccount = async (id) => {
  const userToken = localStorage.getItem("adminAuthToken");
  const API_KEY = `token ${userToken}`;

  const response = await api.get(`/api/switch-to-account/?user_id=${id}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: API_KEY,
    },
  });
  return response.data;
};
