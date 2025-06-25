import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
});

export const getDashboaedData = async () => {
  const userToken = sessionStorage.getItem("authToken");
  // const API_KEY = `token eb3d711bc7bb1de913e6e67abebaab7129fa15e6`;
  const API_KEY = `token ${userToken}`;
  try {
  const response = await api.get("api/user-dashboard/", {
    headers: {
      "Content-Type": "application/json",
      authorization: API_KEY,
    },
  });
  return response.data;
} catch (error) {
  const errorData = error.response?.data;

  let message = "Something went wrong while fetching dashboard stats.";

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
