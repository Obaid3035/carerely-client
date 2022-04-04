import axios from "axios";

export function getFoodProduct(query: string, pageNumber: number) {
  return axios.get(`/calorie?query=${query}&pageNumber=${pageNumber}`)
}
