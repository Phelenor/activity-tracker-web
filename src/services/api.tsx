import axios from "axios";
import { getUserToken } from "../utils/token";

const api = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + getUserToken() ?? "",
  },
});

export function resetApi(){
  api.defaults.headers["Authorization"] = "Bearer " + getUserToken() ?? "";
}

export default api;
