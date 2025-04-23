import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL,
});

export const reconnectAccount = async ({location_id }) => {
  const userToken = localStorage.getItem("authToken");
  if (!userToken) throw new Error("User token not found");

  const API_KEY = `token ${userToken}`;

  try {
    const response = await api.post(
      "/oauth/reconnect_ghl/", 
      { location_id : location_id  },
      { 
        headers: {
          Authorization: API_KEY,
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching GHL subaccounts:", error.response ? error.response.data : error.message);
    throw error;
  }
};
