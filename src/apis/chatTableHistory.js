import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL,
});

export const chatTableHistory = async () => {
  const userToken = sessionStorage.getItem("authToken");
  if (!userToken) throw new Error("User token not found");

  const API_KEY = `token ${userToken}`;
  // const API_KEY = `token 93d92c86a0a543cbcd17067796d87142f369388d`;
  try {
  const response = await api.get(`/api/chat-history/`, {
    headers: {
      Authorization: API_KEY,
    },
  });

  return response.data;
} catch (error) {
  const errorData = error.response?.data;

  let message = "Something went wrong while fetching chat history.";

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
