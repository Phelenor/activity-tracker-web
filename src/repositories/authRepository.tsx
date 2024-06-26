import axios from "axios";
import api from "../services/api";
import { setUserId, setUserToken } from "../utils/token";
import { sha256 } from "js-sha256";
import { ErrorResponse, LoginResponse } from "../types/Network";

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  let passwordHash = sha256.hmac("rafaelova-tajna-tajna", password);

  try {
    const response = await api.post<LoginResponse>("/login", { email, passwordHash });
    setUserToken(response.data.accessToken);
    setUserId(response.data.gymAccount.id);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ErrorResponse;
    } else {
      throw { message: "An unexpected error occurred" } as ErrorResponse;
    }
  }
};

export const register = async (name: string, email: string, password: string): Promise<any> => {
  let passwordHash = sha256.hmac("rafaelova-tajna-tajna", password);

  try {
    await api.post<any>("/register", { name, email, passwordHash });
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ErrorResponse;
    } else {
      throw { message: "An unexpected error occurred" } as ErrorResponse;
    }
  }
};
