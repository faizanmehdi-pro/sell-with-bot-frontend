import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
});

export const superAdminLogin = async ({ email, password }) => {
  try {
    const response = await api.post("api/Admin-login/", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    const message =
      error.response?.message ||
      error.response?.error ||
      "Invalid email or password!";
    throw new Error(message);
  }
};
