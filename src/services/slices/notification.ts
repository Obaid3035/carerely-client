import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../../container/Chat/ChatBox/ChatBox";
import { IConversation } from "../../container/Chat/Chat";
import io from "socket.io-client";
const ENDPOINT = 'https://careraly-server.herokuapp.com';

export interface INotificationState {
  chatNotification: {
    conversation: IConversation[],
    allUnseenMessages: number
  },
  socket: any;
  notification: any,
  selectedChat: IConversation | null
}

const initialState: INotificationState = {
  chatNotification: {
    conversation: [],
    allUnseenMessages: 0
  },
  socket: io(ENDPOINT),
  notification: [],
  selectedChat: null
};


const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setSelectedChat: (state, { payload }) => {
      state.selectedChat = payload
    },
    setChatNotification: (state, { payload }) => {
      state.chatNotification = payload
    }
  }
})

export const { setChatNotification, setSelectedChat } = notificationSlice.actions;

export default notificationSlice.reducer;
