import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
});

export const updateBot = async (data) => {
  const userToken = localStorage.getItem("authToken");
  const API_KEY = `token ${userToken}`;

  const response = await api.post(
    'api/UpdateBot/',
    {
      name: 'Ali',
      role_prompt: data.whyText,
      business_rules: data.businessInfo,
      response_text: data.responseText,
      max_token: data.maxTokens,
      temperature: data.temperature,
      improved_layout: data.improvedLayout,
      general_prompt: data.generalPrompt
    },
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: API_KEY,
      },
    }
  );
  return response.data;
};
