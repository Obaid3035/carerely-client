import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ISideEffect } from './auth';
import { getUserByIdApi, getPostsApi } from '../api';


export interface IPost {
   id: number
   user: {
      id: number
      name: string,
      city: string,
      avatar: string
   }
   postImg: string,
   text: string
}


interface IPostState extends ISideEffect {
   posts: IPost[],
   post: null | IPost,
   pageNo: number,
   limit: number,
   hasMore: boolean
}

export const getPosts =
   createAsyncThunk<any, { pageNo: number, limit: number }, { rejectValue: string }>('posts/getPosts', async ({
                                                                                                                 pageNo,
                                                                                                                 limit,
                                                                                                              }, thunkApi) => {
      try {
         const response: any = await getPostsApi(pageNo, limit);
         return response.data;
      } catch (e: any) {
         return thunkApi.rejectWithValue(e.response.data);
      }
   });

export const getUserById = createAsyncThunk<any, { id: string }, { rejectValue: string }>('posts/getPost', async ({
                                                                                                                     id,
                                                                                                                  }, thunkApi) => {
   try {
      const response: any = await getUserByIdApi(id);
      return response.data;
   } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data);
   }
});


const initialState: IPostState = {
   posts: [],
   pageNo: 1,
   limit: 3,
   hasMore: true,
   post: null,
   isSuccess: false,
   isLoading: false,
   isError: false,
   error: '',
};

const postSlice = createSlice({
   name: 'posts',
   initialState,
   reducers: {
      hasMoreToggle: (state, { payload }) => {
         state.hasMore = payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(getPosts.pending, (state, _action) => {
         state.isLoading = true;
         state.isError = false;
      });
      builder.addCase(getPosts.fulfilled, (state, { payload }) => {
         state.posts = [...state.posts, ...payload];
         state.isError = false;
         state.isSuccess = true;
         state.isLoading = false;
      });

      builder.addCase(getPosts.rejected, (state, { payload }) => {
         state.isLoading = false;
         state.isError = true;
         state.error = payload!;
      });


      builder.addCase(getUserById.pending, (state, _action) => {
         state.isLoading = true;
         state.isError = false;
      });
      builder.addCase(getUserById.fulfilled, (state, { payload }) => {
         state.post = payload;
         state.isError = false;
         state.isSuccess = true;
         state.isLoading = false;
      });
      builder.addCase(getUserById.rejected, (state, { payload }) => {
         state.isLoading = false;
         state.isError = true;
         state.error = payload!;
      });
   },
});

export const { hasMoreToggle } = postSlice.actions;

export default postSlice.reducer;
