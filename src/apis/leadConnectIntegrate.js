import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
});

export const leadConnectIntegrate = async () => {
  const userID = sessionStorage.getItem("user-ID");

  const response = await api.get(`oauth/initiate/?user_id=${userID}`);
  return response.data;
};
