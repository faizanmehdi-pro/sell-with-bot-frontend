import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL,
});

export const testBot = async (message, improvedLayout = false) => {
  const userToken = sessionStorage.getItem("authToken");
  if (!userToken) throw new Error("User token not found");

  const API_KEY = `token ${userToken}`;

  try {
    const response = await api.post(
      "/api/test-chat/",
      {
        message: message,
        improved_layout: improvedLayout ? "true" : "false",
      },
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching GHL subaccounts:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
