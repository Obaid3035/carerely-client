import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userLoginApi } from '../api';
import { IPost } from './post';

export interface IUserInput {
   email: string,
   password: string,
}

export interface IUser {
   id: number;
   name: string;
   email: string;
   avatar: string;
   followers: number,
   following: number,
   postCount: number,
   posts: IPost[]
}

export interface ISideEffect {
   isSuccess: boolean;
   isLoading: boolean;
   isError: boolean;
   error: string;
}

interface UserState extends ISideEffect {
   isAuth: boolean;
   currentUser: null | IUser;
   user: null | IUser;
}

export const userLogin = createAsyncThunk<any, IUserInput, { rejectValue: string }>('auth/loginUser', async (userInput: IUserInput, thunkApi) => {
   try {
      const response: any = await userLoginApi(userInput);
      return response.data;
   } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data);
   }
});

const initialState: UserState = {
   isAuth: false,
   currentUser: null,
   user: null,
   isSuccess: false,
   isLoading: false,
   isError: false,
   error: '',
};


const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setUser: (state, { payload }) => {
         state.currentUser = payload;
      },
      disableError: (state, _action) => {
         state.isError = false;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(userLogin.pending, (state, _action) => {
         state.isLoading = true;
         state.isError = false;
      });
      builder.addCase(userLogin.fulfilled, (state, { payload }) => {
         state.isAuth = true;
         state.currentUser = payload;
         state.isError = false;
         state.isSuccess = true;
         state.isLoading = false;
         localStorage.setItem('user', JSON.stringify(payload));
      });
      builder.addCase(userLogin.rejected, (state, { payload }) => {
         state.isLoading = false;
         state.isError = true;
         state.error = payload!;
      });
   },


});

export const { disableError, setUser } = authSlice.actions;

export default authSlice.reducer;
