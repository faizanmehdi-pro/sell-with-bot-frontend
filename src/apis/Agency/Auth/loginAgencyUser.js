import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
});

export const loginAgencyUser = async ({ email, password }) => {
  try {
    const response = await api.post("api/agency-login/", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Login Failed";
    throw new Error(message);
  }
};
