import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/post';
import notificationReducer from './slices/notification';

export enum IResponseStatus {
   FULFILLED = 'fulfilled',
   REJECTED = 'rejected',
   PENDING = 'pending'
}

export const store = configureStore({
   reducer: {
      post: postReducer,
      notification: notificationReducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
   }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
