import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
});

export const getAgencyCustomersList = async (page) => {
  const userToken = sessionStorage.getItem("agencyAuthToken");
  const API_KEY = `token ${userToken}`;
  try {
    const response = await api.get(`/api/agency-customers-list/?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    const errorData = error.response?.data;

    let message = "Something went wrong while fetching Agency Customers.";

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
