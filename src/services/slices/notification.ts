import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../../container/Chat/ChatBox/ChatBox";


export interface INotificationState {
  chatNotification: IMessage[],
  notification: any
}

const initialState: INotificationState = {
  chatNotification: [],
  notification: [],
};


const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setChatNotification: (state, { payload }) => {
      state.chatNotification = payload
    }
  }
})

export const { setChatNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
