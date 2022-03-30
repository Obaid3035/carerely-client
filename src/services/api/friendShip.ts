import axios from 'axios';
import { getTokenFormat } from '../../helper';

export function sendFollowRequest(receiverId: string) {
   return axios.post(`/friendship/sent/${receiverId}`, {}, getTokenFormat());
}

export function acceptRequest(senderId: string) {
   return axios.put(`/friendship/accept/${senderId}`, {}, getTokenFormat());
}

export function rejectRequest(senderId: string) {
   return axios.delete(`/friendship/decline/${senderId}`, getTokenFormat());
}

export function unFollowRequest(userId: string) {
   return axios.delete(
      `/friendship/delete-friendship/${userId}`,
      getTokenFormat()
   );
}

export function deleteFriendship(friendshipId: number) {
   return axios.delete(`/friendship/${friendshipId}`, getTokenFormat())
}

