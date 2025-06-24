import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
});

export const getDashboardUsers = async (page) => {
  const userToken = localStorage.getItem("authToken");
  const API_KEY = `token ${userToken}`;

  try {
    const response = await api.get(`/api/account-users/`, {
      headers: {
        "Content-Type": "application/json",
        authorization: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    // Log and re-throw or return a structured error message
    console.error("Error fetching dashboard users:", error);

    // Optional: return a custom error format
    throw new Error(
      error.response?.data?.message ||
      error.response?.data?.detail ||
      "Something went wrong while fetching users."
    );
  }
};
