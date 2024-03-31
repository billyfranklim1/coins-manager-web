import axios from "axios";
import { Group } from "../types";


axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem("token");
const token_type = localStorage.getItem("token_type");

axios.defaults.headers.common["Authorization"] = `${token_type} ${token}`;

export const getGroups = async (page = 1) => {
  try {
    const response = await axios.get(`/api/groups?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar grupos:", error);
    throw error;
  }
}

export const getCoins = async () => {
  try {
    const response = await axios.get("/api/coins");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar moedas:", error);
    throw error;
  }
}

export const createGroup = async (group: Group) => {
  try {

    const url = group.id !== 0 ? `/api/groups/${group.id}` : "/api/groups";
    const method =  group.id !== 0 ? "put" : "post";

    const response = await axios[method](url, group);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar grupo:", error);
    throw error;
  }
}

export const updateGroup = async (group: Group) => {
  try {
    const response = await axios.put(`/api/groups/${group.id}`, group);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar grupo:", error);
    throw error;
  }
}

export const deleteGroup = async (id: number) => {
  try {
    const response = await axios.delete(`/api/groups/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar grupo:", error);
    throw error;
  }
}


