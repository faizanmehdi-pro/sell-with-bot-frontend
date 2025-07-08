import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL,
});

export const SignUpAgencyUser = async (userData) => {

  try {
    const response = await api.post(`/api/agency-signup/`, userData)
    return response.data;
  } catch (error) {
    const errorData = error.response?.data;

    let message = "Something went wrong while creating the Agency Account.";

    if (typeof errorData === "object" && errorData !== null) {
      message = Object.entries(errorData)
        .map(
          ([field, errors]) =>
            `${field}: ${Array.isArray(errors) ? errors.join(", ") : errors}`
        )
        .join("\n");
    } else if (typeof errorData === "string") {
      message = errorData;
    }

    throw new Error(message);
  }
};
