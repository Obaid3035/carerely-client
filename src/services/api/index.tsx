import { seedPosts, seedUser } from '../../data';
import { IAuthInput } from '../../container/Auth/Auth';
import axios from 'axios';
import { getTokenFormat } from "../../helper";

export function register(userInput: IAuthInput) {
   return axios.post('/auth/register', userInput);
}

export function login(userInput: IAuthInput) {
   return axios.post('/auth/login', userInput);
}

export function mostFollowedUser() {
   return axios.get('/auth/top', getTokenFormat());
}

export function getPostsApi(pageNo: number, limit: number) {
   return new Promise((resolve) => {
      setTimeout(() => {
         const startIndex = pageNo * limit - limit;
         const endIndex = startIndex + limit;
         const posts = seedPosts.slice(startIndex, endIndex);
         resolve({
            data: posts,
         });
      }, 4000);
   });
}

export function getUserByIdApi(id: string) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         const user = seedUser.find((user) => user.id === parseInt(id));
         if (user) {
            const post = seedPosts.find((post) => user.id === post.user.id);
            resolve({
               data: {
                  ...user,
                  posts: [post],
               },
            });
         } else {
            reject({
               response: {
                  data: 'An Error Occured',
               },
            });
         }
      }, 4000);
   });
}
