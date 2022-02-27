import { seedPosts, seedUser } from '../../data';
import { IUserInput } from '../slices/auth';


export function userLoginApi(userInput: IUserInput) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         const user = seedUser.find((user) => user.email === userInput.email && user.password === userInput.password);
         if (user) {
            console.log('DAMN');
            resolve({
               data: user,
            });
         } else {
            reject({
               response: {
                  error: 'Invalid username or password',
               },
            });
         }
      }, 4000);
   });
}


export function getPostsApi(pageNo: number, limit: number) {
   return new Promise((resolve) => {
      setTimeout(() => {
         const startIndex = (pageNo * limit) - limit;
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
