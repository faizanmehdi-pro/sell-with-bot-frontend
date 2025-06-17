import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
});

export const getAdminUsers = async (page) => {
  const userToken = localStorage.getItem("adminAuthToken");
  const API_KEY = `token ${userToken}`;

  const response = await api.get(`/api/user-list/?page=${page}&limit=8`, {
    headers: {
      "Content-Type": "application/json",
      authorization: API_KEY,
    },
  });
  return response.data;
};
