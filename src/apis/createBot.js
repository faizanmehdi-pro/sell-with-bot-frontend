import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
    baseURL: baseURL
}); 

export const createBot = async () => {
    const { data } = await api.get(`api/bots/`);
    return data;
  };