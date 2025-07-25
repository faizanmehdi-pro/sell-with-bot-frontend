import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
});

export const getAgencyAccount = async () => {
  const userToken = sessionStorage.getItem("agencyAuthToken");
  const API_KEY = `token ${userToken}`;

  const response = await api.get(`/api/user-account-list/`, {
    headers: {
      "Content-Type": "application/json",
      authorization: API_KEY,
    },
  });
  return response.data;
};
