import axios from "axios";

export const BASE_URL = process.env.API_URL

export const myAxios = axios.create({
   baseURL: BASE_URL,
});