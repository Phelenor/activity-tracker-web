import { GymEquipment } from "../types/GymEquipment";
import axios from "axios";
import api from "../services/api";
import { ErrorResponse } from "../types/Network";

export const getGymEquipment = async (): Promise<GymEquipment[]> => {
  try {
    const response = await api.get<GymEquipment[]>("/equipment");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ErrorResponse;
    } else {
      throw { message: "An unexpected error occurred" } as ErrorResponse;
    }
  }
};

export const createGymEquipment = async (GymEquipment: Omit<GymEquipment, "id">): Promise<GymEquipment> => {
  try {
    const response = await api.post<GymEquipment>("/equipment", GymEquipment);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ErrorResponse;
    } else {
      throw { message: "An unexpected error occurred" } as ErrorResponse;
    }
  }
};
