import axios from "axios";
import { Coin } from "../types";


axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem("token");
const token_type = localStorage.getItem("token_type");

axios.defaults.headers.common["Authorization"] = `${token_type} ${token}`;


export const getCoins = async (page=1) => {
  try {
    const response = await axios.get(`/api/coins?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar moedas:", error);
    throw error;
  }
}

export const getQuotes = async (page=1, coin_id: number) => {
  try {
    const response = await axios.get(`/api/quotes?page=${page}&coin_id=${coin_id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cotações:", error);
    throw error;
  }
}



