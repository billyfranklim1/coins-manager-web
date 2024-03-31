import axios from "axios";
import { Login, Register } from "../types";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const login = async (login: Login) => {
  const url = `/api/auth/login`;
  const response = await axios.post(url, login, {
    headers: {
      accept: "application/json",
    },
  });
  return response.data;
};


export const register = async (register: Register) => {
  try {
    const url = `/api/auth/register`;
    const response = await axios.post(url, register, {
      headers: {
        accept: "application/json",
      },
    });

    return response.data;

  } catch (error) {
    console.error("Erro ao fazer registro:", error);
    throw error;
  }
};