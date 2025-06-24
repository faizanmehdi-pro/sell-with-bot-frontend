import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL,
});

export const chatTableHistory = async () => {
  const userToken = localStorage.getItem("authToken");
  if (!userToken) throw new Error("User token not found");

  const API_KEY = `token ${userToken}`;
  // const API_KEY = `token 93d92c86a0a543cbcd17067796d87142f369388d`;

  const response = await api.get(`/api/chat-history/`, {
    headers: {
      Authorization: API_KEY,
    },
  });

  return response.data;
};
