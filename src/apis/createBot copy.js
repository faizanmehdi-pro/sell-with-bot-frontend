import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
    baseURL: baseURL
}); 

export const fetchJobById = async (id) => {
    const { data } = await api.get(`JobDetail/${id}`);
    return data;
  };