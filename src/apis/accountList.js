import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL,
});

export const getGHLSubAccounts = async (payload) => {
  const userToken = localStorage.getItem("authToken");
  if (!userToken) throw new Error("User token not found");

  const API_KEY = `token ${userToken}`;

  try {
    const response = await api.post(
      "/oauth/ghl_account_list", 
      { accounts: [payload] }, // Request body with the accounts array
      { 
        headers: {
          Authorization: API_KEY, // Authorization header properly placed here
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching GHL subaccounts:", error.response ? error.response.data : error.message);
    throw error;
  }
};
