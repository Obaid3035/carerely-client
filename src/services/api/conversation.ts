import axios from "axios";
import { getTokenFormat } from "../../helper";

export const getAllConversations = () => {
  return axios.get(`/conversation`, getTokenFormat())
}

export const createConversation = (userId: string) => {
  return axios.post(`/conversation/${userId}`, {},getTokenFormat())
}

export const getAllMessagesByConversationId = (conversationId: number) => {
  return axios.get(`/message/${conversationId}`, getTokenFormat())
}

export const createMessage = (conversationId: number, userInput: any) => {
  return axios.post(`/message/${conversationId}`, userInput ,getTokenFormat())
}
