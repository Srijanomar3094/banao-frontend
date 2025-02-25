import axios from "axios";
export const baseURL = "https://localhost:8000/api";
export const imageURL = "https://localhost:8000";



export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": undefined,
  },
});