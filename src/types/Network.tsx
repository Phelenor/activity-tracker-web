import { GymAccount } from "./GymAccount";

export interface LoginResponse {
  gymAccount: GymAccount;
  accessToken: string;
}

export interface ErrorResponse {
  message: string;
}
