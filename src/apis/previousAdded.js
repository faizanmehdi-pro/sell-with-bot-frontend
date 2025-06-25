import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL,
});

export const previousAdded = async () => {
  const userToken = sessionStorage.getItem("authToken");
  if (!userToken) throw new Error("User token not found");

  const API_KEY = `token ${userToken}`;

  const response = await api.get(`/oauth/ghl_search/`, {
    headers: {
      Authorization: API_KEY,
    },
  });

  return response.data.previous_accounts;
};
