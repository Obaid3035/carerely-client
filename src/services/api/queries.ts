import axios from "axios";
import { getTokenFormat } from "../../utils/helper";
import { text } from "stream/consumers";

export function getTopic() {
  return axios.get(`/queries/topic`, getTokenFormat())
}

export function getQueries(topicId: number) {
  return axios.get(`/queries/${topicId}`, getTokenFormat())
}

export function createQueries(topicId: number, text: string) {
  return axios.post(`/queries/${topicId}`, { text }, getTokenFormat())
}

export function getAnswers(queryId: number) {
  return axios.get(`/queries/answer/${queryId}`, getTokenFormat())
}

export function createAnswers(queryId: number, text: string) {
  return axios.post(`/queries/answer/${queryId}`, { text }, getTokenFormat())
}

export function deleteQueries(queryId: number) {
  return axios.delete(`/queries/${queryId}`, getTokenFormat())
}


