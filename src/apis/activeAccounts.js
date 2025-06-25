import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL,
});

export const activeAccounts = async () => {
  const userToken = sessionStorage.getItem("authToken");
  if (!userToken) throw new Error("User token not found");

  const API_KEY = `token ${userToken}`;

  const response = await api.get(`/oauth/active-accounts/`, {
    headers: {
      Authorization: API_KEY,
    },
  });

  return response.data;
};
