import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL,
  withCredentials: true, // ✅ send cookies (csrftoken, sessionid)
});

export const logoutUser = async () => {
  const userToken = sessionStorage.getItem("authToken");
  if (!userToken) throw new Error("User token not found");

  const API_KEY = `token ${userToken}`;

  const response = await api.post(
    `/api/logout/`,
    {}, // empty body
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
      },
    }
  );

  return response.data;
};
