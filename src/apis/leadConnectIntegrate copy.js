import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
});

export const leadConnectIntegrate = async () => {
  const userToken = localStorage.getItem("authToken");
  const API_KEY = `token ${userToken}`;

  const response = await api.get(
    'oauth/initiate/',
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: API_KEY,
      },
    }
  );
  return response.data;
};
