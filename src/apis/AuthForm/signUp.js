import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
});

export const signupUser = async (userData) => {
  try {
    const response = await api.post("api/signup/", userData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Signup failed";
    throw new Error(message);
  }
};
