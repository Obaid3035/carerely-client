import axios from "axios";
import { getTokenFormat } from "../../utils/helper";

export function getFoodProduct(query: string, pageNumber: number) {
  return axios.get(`/calorie?query=${query}&pageNumber=${pageNumber}`)
}


export function createFoodProduct(userInput: any) {
  return axios.post(`/calorie`, userInput, getTokenFormat())
}

export function getFoodProductStats(calorieId: string, type: string) {
  return axios.get(`/calorie/stats/${calorieId}?type=${type}`, getTokenFormat())
}


export function getHistoryLog(page: number, size: number) {
  return axios.get(`/calorie/history?page=${page}&size=${size}`, getTokenFormat())
}
