import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
});

export const verifyOtpCode = async ({ email, otp }) => {
  try {
    const response = await api.post("api/verify_otp/", {
      email,
      otp,
    });

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Invalid OTP";
    throw new Error(message);
  }
};
