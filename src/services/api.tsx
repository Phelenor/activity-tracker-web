import axios from "axios";
import { getUserToken } from "../utils/token";

const api = axios.create({
  baseURL: "http://localhost:3000/api/gym",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + getUserToken() ?? "",
  },
});

export default api;
