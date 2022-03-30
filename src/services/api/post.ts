import axios from 'axios';
import { getTokenFormat } from '../../helper';

export function getFeedPost(page: number, size: number) {
   return axios.get(`/posts?page=${page}&size=${size}`, getTokenFormat());
}


export function likePost(postId: number) {
   return axios.post(`/likes/${postId}`, {}, getTokenFormat());
}

export function createPost(userInput: any) {
   return axios.post(`/posts`, userInput, getTokenFormat());
}

export function getPostById(postId: string) {
   return axios.get(`/posts/${postId}`, getTokenFormat());

}

export function createComment(userInput: {text: string}, postId: number) {
   return axios.post(`/comments/${postId}`, userInput, getTokenFormat());
}

export function currentUserPost(page: number, size: number) {
   return axios.get(`/posts/current-user?page=${page}&size=${size}`, getTokenFormat())
}

export function currentUserStats() {
   return axios.get('/auth/current-user/stats', getTokenFormat())
}

export function otherProfile(userId: string) {
   return axios.get(`/auth/stats/${userId}`, getTokenFormat())
}

export function otherProfilePost(userId: string, page: number, size: number) {
   return axios.get(`/posts/user/${userId}?page=${page}&size=${size}`, getTokenFormat());
}

export function getTrendingPosts() {
   return axios.get(`/posts/trending/few`, getTokenFormat())
}
