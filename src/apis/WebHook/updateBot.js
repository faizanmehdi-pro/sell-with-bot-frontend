import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
});

export const updateBot = async (data) => {
  const userToken = sessionStorage.getItem("authToken");
  const API_KEY = `token ${userToken}`;

  let payload = {};

  if (data.improvedLayout) {
    payload = {
      name: data.botName,
      prompt: data.whyText,
      business_rules: data.businessInfo,
      response_text: data.responseText,
      improved_temperature: data.temperature,
      improved_max_token: data.maxTokens,
      role: data.role,
      goal: data.goal,
      improved_layout: true,
    };
  } else {
    payload = {
      name: data.botName,
      role_prompt: data.generalPrompt,
      temperature: data.temperature,
      max_token: data.maxTokens,
      improved_layout: false,
    };
  }

  const response = await api.post("api/UpdateBot/", payload, {
    headers: {
      "Content-Type": "application/json",
      authorization: API_KEY,
    },
  });

  return response.data;
};
