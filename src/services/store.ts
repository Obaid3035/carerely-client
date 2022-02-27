import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import postReducer from './slices/post';

export enum IResponseStatus {
   FULFILLED = 'fulfilled',
   REJECTED = 'rejected',
   PENDING = 'pending'
}

export const store = configureStore({
   reducer: {
      auth: authReducer,
      post: postReducer,
   },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
