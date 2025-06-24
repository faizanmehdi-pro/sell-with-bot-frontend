import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL,
});

export const createDashboardUser = async (userData) => {
  const userToken = localStorage.getItem("authToken");
  const API_KEY = `token ${userToken}`;

  try {
    const response = await api.post(`/api/account-users/`, userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    const errorData = error.response?.data;

    let message = "Something went wrong while creating the user.";

    if (typeof errorData === "object" && errorData !== null) {
      message = Object.entries(errorData)
        .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(", ") : errors}`)
        .join("\n");
    } else if (typeof errorData === "string") {
      message = errorData;
    }

    throw new Error(message);
  }
};
